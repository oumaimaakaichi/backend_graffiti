
const design = require("../models/design")
const Designe = require("../models/design")

/*exports.create = async (req,res)=>{
try {
    const {nomDesign,dateAjout,Description,rating} = req.body
    let designe = new  Designe({
        nomDesign:nomDesign,
        dateAjout:Date(dateAjout),
        Description : Description,
        rating : rating,
       

    })
    if (req.file){
        designe.Model=req.file.path
    }
    designe.save().then(
        response=>{
            res.status(200).json({message:"Designe added succesfuly"})
        }
    ).catch(erreur=>{
        res.status(401)
        throw new Error(erreur.message)
    })

}catch (e){
    res.staus(401)
    throw  new Error("somting went wrong")
}
}
*/


//api find all designs
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        design.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found design with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        design.find()
            .then(desig => {
                res.send(desig)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving comment information" })
            })
    }

    
}
//delete design
exports.delete = (req, res)=>{
    const id = req.params.id;

    design.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete design with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "design was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "design not delete comment with id=" + id
            });
        });
}
