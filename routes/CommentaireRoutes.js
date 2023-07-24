const express = require('express');
const route = express.Router()

const commentaire = require('../models/commentaires')

const controller = require('../controller/commentaireController')

// API
route.post('/api/ajoutCommentaire', controller.create);
route.get('/api/SelectCommentaire', controller.find);
route.put('/api/updateCommentaire/:id', controller.update);
route.delete('/api/deleteCommentaire/:id', controller.delete);




//select commentaire par produit
route.get('/getCommentByProduit/:produit', async ( req, res)=>{

  try {
      
  const oneComt = await commentaire.find({ produit:req.params.produit}).populate("produit")
  res.status(201).json(oneComt);
  
  } catch (error) {
    console.log(error.message);  
  }
  })
    
module.exports = route