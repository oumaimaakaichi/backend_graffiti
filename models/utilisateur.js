const mongoose = require("mongoose")
const Schema = mongoose.Schema({
    nom :{
        type : String,
        required : true
    },
    prenom : {
        type : String,
        required: true
    },
    email :{
        type : String,
        required : true
    },
    motDePasse: {
        type : String,
        required:true
    },
    dateDeNaissance:{
        type:String,
        required:true
    },
    role : {
        type: String,
        enum : ["Client","Administrateur","Designeur","Imprimeur"],
        default:"Client"
    },
    tel:{
        type: Number,
        required : true
    },
    statut:{
        type:String,
        enum:["En_attente",  "accepté"],
        default:"En_attente"
    
      },
      commentaires : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentaires"
    }],
    commandes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "commandes"
    }],
    produits : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "produits"
    }],
    designs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "designs"
    }]
})

module.exports = mongoose.model('utilisateur',Schema)