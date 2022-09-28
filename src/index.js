const express = require('express');
const route = require('./routes/route');
const  mongoose  = require('mongoose');
const app = express();
const multer = require("multer");
require('dotenv').config()

app.use(express.json());
app.use( multer().any())


app.use(express.urlencoded({ extended: true }));

 mongoose.connect(process.env.DB, {
    useNewUrlParser: true})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + process.env.PORT)
});
