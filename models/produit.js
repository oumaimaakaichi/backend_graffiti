const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nomProduit:{
    type:String,
    required:true
  },
    type : {
        type : String,
        required:true
    },
    caracteristique:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
  prix:{
    type:Number,
    required:true
  },
 
  utilisateurr : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateurr" 
   },
   design : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "design" 
   },
   commandes : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commandes" 
   }
 
})

const produit = mongoose.model('produit', schema);

module.exports = produit;