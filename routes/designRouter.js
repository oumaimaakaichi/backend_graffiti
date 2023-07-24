const express = require('express');
const route = express.Router()

const storage=require('../middleware/upload');
const design = require('../models/design')
const multer = require('multer');
//const mongoose = require('mongoose');

const controller=require('../controller/DesignController')
const path = require('path');



route.get('/api/SelectDesign', controller.find);
route.delete('/api/deleteDesign/:id', controller.delete);
//api ajout produit
const upload = multer({
  storage: storage,
});
route.post("/registerd", upload.single("Model"), async (req, res) => {
 
  const {
    nomDesign,
        dateAjout,
        Description ,
        rating 
      
    
  } = req.body;

  try {
      const des= new design({
        nomDesign,
        dateAjout,
        Description ,
        rating 
      });
      if (req.file){
        des.Model=req.file.path
    }
      
      
      let result = await des.save();

      res.status(200).send({
        produit: result,
        msg: "enregistrer avec succes",
      });
    
  } catch (error) {
    console.log(error);
    res.status(400).send("vous pouvez pas enregistrer utilisteur");
  }
});




//api afficher design selon nom
route.get('/getDesignSelonNom/:nomDesign', async ( req, res)=>{

  try {
      
  const oneComt = await design.find({ nomDesign:req.params.nomDesign}).populate("nomDesign")
  res.status(201).json(oneComt);
  
  } catch (error) {
    console.log(error.message);  
  }
  })


      //chercher un design
   
      route.get("/searchDesign/:key", async (req, resp) => {
        let data = await design.find({
           
            "$or": [
                { nomDesign: { $regex: req.params.key } },
      
      
            ]
        })
        resp.send(data);
      })



/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  


  route.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      // Créez un nouvel objet avec les données du formulaire
      const newModel = new design({
        nomDesign: req.body.nomDesign,
        rating: req.body.rating,

        Description:req.body.Description,

        DateAjout:req.body.DateAjout,
        Model: req.file.path, // Le chemin du fichier PDF téléchargé
      });
  
      // Sauvegarder l'objet dans la base de données
      await newModel.save();
  
      res.status(200).json({ message: 'Document ajouté avec succès.' });
    } catch (err) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du document.' });
    }
  });
*/


module.exports = route