const express = require('express');
const route = express.Router()

const commande = require('../models/commande')

const controller = require('../controller/CommandeController')

// API
route.post('/api/ajoutCommande', controller.create);
route.get('/api/SelectCommande', controller.find);
route.put('/api/updateCommande/:id', controller.update);
route.delete('/api/deleteCommande/:id', controller.delete);


 //get commande by etat/en cours
 route.get('/getByEtat', async ( req, res)=>{

    try {
        
    const oneCommande = await commande.find({EtatCommande:"En_cours"})
    res.status(201).json(oneCommande);
    
    } catch (error) {
      console.log(error.message);  
    }
    
    
    
    })

//get commande by etat= envoyée
route.get('/getByEtatEnv', async ( req, res)=>{

    try {
        
    const oneCommande = await commande.find({EtatCommande:"envoyee"})
    res.status(201).json(oneCommande);
    
    } catch (error) {
      console.log(error.message);  
    }
    
    
    
    })
    
module.exports = route