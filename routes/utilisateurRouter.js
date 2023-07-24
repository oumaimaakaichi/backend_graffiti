const express = require('express');
const route = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Token } = require("../models/Token");
const config = require('../config')
const user=require('../models/utilisateur')
const controller = require('../controller/utilisateurController');
const utilisateur = require('../models/utilisateur');
const { auth } = require("../middleware/auth");
// API
route.post('/api/ajoutuser', controller.create);

route.get('/api/SelectAllUser', controller.find);
route.put('/api/updateUser/:id', controller.update);
route.delete('/api/deleteUser/:id', controller.delete);
 


//afficher tous les clients
route.get('/getClient', async ( req, res)=>{

    try {
        
    const users= await user.find({role:"Client"}).populate(
        {
            path:"_id",
            select :"-motDePasse"
        }).select('-motDePasse');
    res.status(201).json(users);
    
    } catch (error) {
      console.log(error.message);  
    }
    
    
    
    })
    //afficher tous les clients
route.get('/getDesigneur', async ( req, res)=>{

    try {
        
    const users= await user.find({role:"Designeur"}).populate(
        {
            path:"_id",
            select :"-motDePasse"
        }).select('-motDePasse');
    res.status(201).json(users);
    
    } catch (error) {
      console.log(error.message);  
    }
    
    
    
    })

//afficher tous les imprimeurs
route.get('/getImprimeur', async ( req, res)=>{

    try {
        
    const users= await user.find({role:"Imprimeur"}).populate(
        {
            path:"_id",
            select :"-motDePasse"
        }).select('-motDePasse');
    res.status(201).json(users);
    
    } catch (error) {
      console.log(error.message);  
    }
    
    
    
    })

    //afficher tous les administrateur
    route.get('/getAdmin', async ( req, res)=>{
    
        try {
            
        const users= await user.find({role:"Administrateur"}).populate(
            {
                path:"_id",
                select :"-motDePasse"
            }).select('-motDePasse');
        res.status(201).json(users);
        
        } catch (error) {
          console.log(error.message);  
        }
        
        
        
        })


        //get user by id
        route.get('/getuserbyId/:id', async ( req, res)=>{

            try {
                
            const oneUser = await user.findOne({_id:req.params.id}).populate(
                {
                    path:"_id",
                    select :"-motDePasse"
                }).select('-motDePasse');
            res.status(201).json(oneUser);
            
            } catch (error) {
              console.log(error.message);  
            }
            
            
            
            })



    // api accépter utilisateur


  
route.put("/accepter/:id", async (req, res) => {
    try {
      const id = req.params.id;
      let mdd = {
        statut: "accepté",
      };
      let aa = await utilisateur.findByIdAndUpdate({ _id: id }, { ...mdd });
      res.status(200).send(mdd);
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  });



  //login
 
  
route.post("/loginUser", (req, res) => {
  user.findOne({ email: req.body.email }) // Utilisez le modèle User au lieu de "user" pour rechercher l'utilisateur
    .exec()
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(401).json({
          status: false,
          message: "Utilisateur n'est pas trouvé",
          data: undefined,
        });
      }
      bcrypt.compare(req.body.motDePasse, utilisateur.motDePasse, async (err, result) => {
        if (err) {
          return res.status(401).json({
            status: false,
            message: "Erreur serveur, authentification échouée",
            data: undefined,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: utilisateur.email,
              utilisateurId: utilisateur._id,
              role:utilisateur.role
            },
            config.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );

          await Token.findOneAndUpdate(
            { _utilisateurId: utilisateur._id, tokenType: "login" },
            { token: token },
            { new: true, upsert: true }
          );
          return res.status(200).json({
            status: true,
            message: "login successfuly",
            data: {
              token,
              user,
            },
          });
        } else {
          return res.status(401).json({
            status: false,
            message: "Mot de passe incorrect, connexion échouée",
            data: undefined,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Erreur serveur, authentification échouée",
        data: undefined,
      });
    });
});

  
  //logout
  
route.get("/logout", auth, (req, res) => {
  Token.findOneAndDelete(
    { _utilisateurId: req.utilisateurId, type: "login" },
    (err, doc) => {
      if (err)
        return res.status(401).json({
          status: false,
          message: "server error, logout failed",
        });
      return res.status(200).json({
        status: true,
        message: "logout successfly",
      });
    }
  );
});


  //chercher client

route.get("/searchClient/:key", async (req, resp) => {
  let data = await utilisateur.find({
      role:"Client",
      "$or": [
          { nom: { $regex: req.params.key } },
          { prenom: { $regex: req.params.key } }
       

      ]
  })
  resp.send(data);
})

//chercher designeur

route.get("/searchDesigneur/:key", async (req, resp) => {
  let data = await utilisateur.find({
      role:"Designeur",
      "$or": [
          { nom: { $regex: req.params.key } },
          { prenom: { $regex: req.params.key } }
       

      ]
  })
  resp.send(data);
})
//chercher imprimeur

route.get("/searchImprimeur/:key", async (req, resp) => {
  let data = await utilisateur.find({
      role:"Imprimeur",
      "$or": [
          { nom: { $regex: req.params.key } },
          { prenom: { $regex: req.params.key } }
       

      ]
  })
  resp.send(data);
})

module.exports = route