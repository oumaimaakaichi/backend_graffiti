const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    dateCommande : {
        type : String,
        required:true
    },
    adresse:{
        type:String,
        required:true
        
    },
    quantité:{
        type:Number,
        required:true
    },
  EtatCommande:{
    type:String,
    enum:["En_cours",  "envoyee"],
    default:"En_cours"

  },
 
  utilisateuur : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateuur" 
   },
   produits : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "produits" 
   },
   
})

const commande = mongoose.model('commande', schema);

module.exports = commande;