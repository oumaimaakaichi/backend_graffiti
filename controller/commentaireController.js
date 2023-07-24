var commentairedb = require('../models/commentaires');
var utilisateurs=require('../models/utilisateur')



var design=require('../models/design')
// api ajout commentaire
exports.create = async(req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const commentaire = new commentairedb({
        comment : req.body.comment,
        produit : req.body.produit,
        emetteur:req.body.emetteur,
        date:req.body.date
  
        
    })
    commentaire.utilisateur = req.body.utilisateur
    
    await utilisateurs.updateOne(
        { _id:req.body.utilisateur},
         {
             $addToSet: { commentaires: commentaire._id },
           },
           { new: true }
 
       ),
       commentaire.design = req.body.design

    
    await design.updateOne(
        { _id:req.body.design},
         {
             $addToSet: { commentairess: commentaire._id },
           },
           { new: true }
 
       )
    // save comment in the database
    commentaire
        .save(commentaire)
        .then(data => {
            res.status(200).send({
                Commentaire: data,
                msg: "enregistrer avec succes",
              });
           
        })
       
        
        
 
        .catch(err =>{
            return res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


//api find all comments
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        commentairedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found comment with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        commentairedb.find()
            .then(comment => {
                res.send(comment)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving comment information" })
            })
    }

    
}


//update comment
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    commentairedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


//delete commentaire
exports.delete = (req, res)=>{
    const id = req.params.id;

    commentairedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "comment was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete comment with id=" + id
            });
        });
}

