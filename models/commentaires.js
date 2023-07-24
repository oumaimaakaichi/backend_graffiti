const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    comment : {
        type : String,
        required:true
    },
    emetteur:{
        type:String,
        required:true
    },
    produit:{
        type:String,
        required:true
    },
  date:{
    type:String
  },
  utilisateur : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateur" 
   },
   design : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "design" 
   }
 
 
})

const commentaire = mongoose.model('commentaire', schema);

module.exports = commentaire;