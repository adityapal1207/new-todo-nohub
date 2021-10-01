const express = require('express');
const app = express();
//const route = require('./controller/movies');
const todoRoute = require('./routes/todo');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const connectDb = require('./config/db.js');

app.use(bodyParser.json());
//bodyParser used to parsing the application/json
 connectDb();
 //connecting database

//middleware 
 const  middleware = (req,res,next)=>{
     
     console.log('Logging the values' ,);
     req.name='Aditya';
     next(); 

 }
 app.use(middleware); 


//app.use('/api/',route);
app.use('/api/todo/',todoRoute);
app.use('/api/user/',auth,userRoute);
app.use('/static/',express.static('public'));
app.use('/images',express.static('public/images'));

app.get('*',(req,res)=>{
    console.log(`Sorry the url does not exist`);
    res.send(`Sorry the url does not exist`);
})


app.listen( 9000, () => {
    console.log(`Server is listening  to 9000`)

});
