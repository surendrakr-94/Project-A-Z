const express=require('express')
const mongoose=require('mongoose')
const route=require('./routes/route.js')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/url",{
   useNewUrlParser:true
})
.then(()=>console.log("mongoDb is connected"))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(3000,function(){
    console.log("express at running on port" + (3000))
})