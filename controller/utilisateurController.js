var utilisateur = require('../models/utilisateur')
const bcrypt = require("bcrypt");


// api ajout user
exports.create =   async (req, res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // new user
    const user = new utilisateur({
        nom : req.body.nom,
        prenom : req.body.prenom,
        email:req.body.email,
        motDePasse:req.body.motDePasse,
        dateDeNaissance:req.body.dateDeNaissance,
        role:"Client",
        tel:req.body.tel
        
    })
    const salt = 10;
    const gensalt = await bcrypt.genSalt(salt);
    const hashedPassword = await  bcrypt.hash(user.motDePasse, gensalt);
    user.motDePasse=hashedPassword;

    // save user in the database
   user
        .save(user)
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
 //api select all users
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        utilisateur.findById(id)
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
        utilisateur.find().populate(
            {
                path:"_id",
                select :"-motDePasse"
            }).select('-motDePasse')
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving comment information" })
            })
    }

    
}
//api update user
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
        utilisateur.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

//delete user
exports.delete = (req, res)=>{
    const id = req.params.id;

    utilisateur.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete user with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "user was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "user not delete comment with id=" + id
            });
        });
}



