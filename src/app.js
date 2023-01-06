const express=require('express')
const mongoose =require('mongoose')
const env=require('dotenv')
const cors=require('cors');

env.config();
const app=express();
const PORT=5000


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo yeahh')
})
mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})

require('./models/user')
require('./models/post')


app.use(express.json())
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



//ZDdpzisglyH0z93K

/* const customMiddleware=(req,res,next)=>{
    console.log("middleware executed!!");
    next();
}



app.get('/',(req,res)=>{
    console.log('home')
    res.send('hello world')
});
app.get('/about',customMiddleware,(req,res)=>{
    console.log('about')
    res.send('about page')
});
 */


app.listen(PORT,()=>{console.log('server is running on',PORT)})