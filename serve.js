const express=require('express');
const mongoConnection=require('./dataBase');
const  cors= require('cors')
const bodyParser = require('body-parser')
const d=require('./models/design')
const app =express();



app.listen(3002 , 'localhost',()=>{
    console.log('Application connected sur le port 3001...');
});

mongoConnection();
app.use(express.json())
app.use('/' , require('./routes/CommentaireRoutes'))
app.use('/' , require('./routes/ProduitRouter'))
app.use('/' , require('./routes/commandeRouter'))

app.use('/' , require('./routes/designRouter'))
app.use('/' , require('./routes/utilisateurRouter'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


app.get("/uploads/:image", function (req, res) {
  res.sendFile(__dirname + "/uploads/" + req.params.image);
});

app.use(cors());



