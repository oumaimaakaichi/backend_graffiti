const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nomDesign:{
    type:String,
    required:true
  },
    
   rating:{
        type:Number,
        required:true
    },
  Description:{
        type:String,
        //required:true
    },
  DateAjout:{
    type:String,
    //required:true
  },
 Model:{
    type:String,
    required:true
 },
 utilisateurrr : {
  type: mongoose.Schema.Types.ObjectId,
  ref: "utilisateurrr" 
 },

 commentairess : [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "commentairess"
}],
Produits : [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Produits"
}],
})

const design = mongoose.model('design', schema);

module.exports = design;