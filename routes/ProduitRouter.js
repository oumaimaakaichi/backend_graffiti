
const express = require('express');
const route = express.Router()
const produit=require('../models/produit')
const storage=require('../middleware/upload');
const multer = require("multer");
const designn=require('../models/design')
var utilisateurs=require('../models/utilisateur')


var commandedb=require('../models/commande')
const controller = require('../controller/ProduitController')
route.delete('/api/deleteProduit/:id', controller.delete);
route.get('/api/SelectProduit', controller.find);
route.put('/api/updateProduit/:id', controller.update);

//api ajout produit
const upload = multer({
    storage: storage,
  });
route.post("/registerProduit", upload.single("image"), async (req, res) => {
   
    const {
      nomProduit,
       type,
       caracteristique,
       prix,
       image
      
    } = req.body;
  
    try {
        const newProduit= new produit({
          nomProduit,
            type,
            caracteristique,
             prix,
             image
        });
        
        if (req.file) {
          newProduit.image = "http://localhost:3002/uploads/" + req.file.filename
        /* req.files.map(file => {
  
        })} */}
        
        newProduit.utilisateurr = req.body.utilisateurr
    
        await utilisateurs.updateOne(
            { _id:req.body.utilisateurr},
             {
                 $addToSet: { produits: newProduit._id },
               },
               { new: true }
     
           ),

           newProduit.design = req.body.design
    
        await designn.updateOne(
            { _id:req.body.design},
             {
                 $addToSet: { Produits: newProduit._id },
               },
               { new: true }
     
           ),
           newProduit.commandes = req.body.commandes
    
           await commandedb.updateOne(
               { _id:req.body.commandes},
                {
                    $addToSet: { produits: newProduit._id },
                  },
                  { new: true }
        
              )
   




        let result = await newProduit.save();
  
        res.status(200).send({
          produit: result,
          msg: "enregistrer avec succes",
        });
      
    } catch (error) {
      console.log(error);
      res.status(400).send("vous pouvez pas enregistrer utilisteur");
    }
  });


  //api afficher produit selon type
  route.get('/getProduitParType/:type', async ( req, res)=>{

    try {
        
    const oneComt = await produit.find({ type:req.params.type}).populate("type")
    res.status(201).json(oneComt);
    
    } catch (error) {
      console.log(error.message);  
    }
    })


    //modifier un produit
    route.put("/mdf/:id", async (req, res) => {
      try {
        const id = req.params.id;
        let mdd = {
          statut: "confirme",
        };
        let aa = await produit.findByIdAndUpdate({ _id: id }, { ...mdd });
        res.status(200).send(mdd);
      } catch (error) {
        console.log(error);
        res.status(401).send(error);
      }
    });


    // afficher un produit selon leur nom
    route.get('/getProduitParNom/:nomProduit', async ( req, res)=>{

      try {
          
      const oneComt = await produit.find({ type:req.params.nomProduit}).populate("nomProduit")
      res.status(201).json(oneComt);
      
      } catch (error) {
        console.log(error.message);  
      }
      })
  


      //chercher un produit
      // search client
route.get("/searchProduit/:key", async (req, resp) => {
  let data = await produit.find({
     
      "$or": [
          { nomProduit: { $regex: req.params.key } },


      ]
  })
  resp.send(data);
})

  module.exports = route