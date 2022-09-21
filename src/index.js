const express = require('express');
const route = require('./routes/route');
const  mongoose  = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://Sushant_Bhaiswar_30:WBYUu1bCYmxmZUmg@cluster0.jui41on.mongodb.net/group17Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(3000, function () {
    console.log('Express app running on port ' + 3000)
});