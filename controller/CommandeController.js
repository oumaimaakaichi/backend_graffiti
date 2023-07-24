var commandedb = require('../models/commande');
var utilisateurs=require('../models/utilisateur')
var produitDB=require('../models/produit')
// api ajout commande
exports.create = async(req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const commande = new commandedb({
        adresse : req.body.adresse,
        quantité : req.body.quantité,
        dateCommande:req.body.dateCommande,
        EtatCommande:req.body.EtatCommande
  
        
    })
    commande.utilisateuur = req.body.utilisateuur
    
    await produitDB.updateOne(
        { _id:req.body.produits},
         {
             $addToSet: { produits: commande._id },
           },
           { new: true }
 
       ),



       commande.produits = req.body.produits
    
       await utilisateurs.updateOne(
           { _id:req.body.utilisateuur},
            {
                $addToSet: { commandes: commande._id },
              },
              { new: true }
    
          )
    // save comment in the database
    commande
        .save(commande)
        .then(data => {
            res.status(200).send({
                Commande: data,
                msg: "enregistrer avec succes",
              });
           
        })
        .catch(err =>{
            return res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


//api find all commandes
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        commandedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found commande with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        commandedb.find()
            .then(commande => {
                res.send(commande)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving comment information" })
            })
    }

    
}


//update commande
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
        commandedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update commande with ${id}. Maybe commande not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


//delete commande
exports.delete = (req, res)=>{
    const id = req.params.id;

    commandedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete commandewith id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "commande was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Commande not delete comment with id=" + id
            });
        });
}

