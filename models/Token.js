const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = Schema({
    token: {
        type: String,
        required: true
    },
    _utilisateurId: {
        type: Schema.Types.ObjectId,
        ref: "utilisateur"
    },
    
    tokenType: {
        type:String,
       enum: ["login", "restPassword"]
    }
 
});

const Token = mongoose.model("tokens", tokenSchema);
module.exports = {Token};