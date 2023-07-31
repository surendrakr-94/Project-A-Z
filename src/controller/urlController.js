const urlModel=require("../model/urlModel")
const shortid = require('shortid');
const validUrl = /^([hH][tT][tT][pP]([sS])?:\/\/.)(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=_]*$)/g;;
const regex=/^(?=.*[a-zA-Z].*)[a-zA-Z\d!@#-_$%&*]{8,}$/

const isValid = function(value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length > 0) return true;
    return false;
};

// const isValidRequest = function(object) {
//     return Object.keys(object).length > 0;
// };

const shortenUrl = async(req,res)=>{
    try {
        let longUrl=req.body.longUrl
        if (!isValid(longUrl))
      return res.status(400).send({ status: false, message: "Please provide Url" });
      if (!validUrl.test(longUrl))
      return res.status(400).send({ status: false, message: "Url is invalid" });
        let presentUrl= await urlModel.findOne({longUrl}).select({_id:0,createdAt:0,updatedAt:0,__v:0})
        if(presentUrl){
            return res.status(200).send({ status: false, data:  presentUrl});
        }
        let base="http://localhost:3000/"
        let urlCode=shortid.generate(longUrl)
       
        let shortUrl= base+urlCode
    let newData={
        urlCode:urlCode,
       longUrl:longUrl,
       shortUrl:shortUrl

    }
        let createdUrl= await urlModel.create(newData)

            return res.status(201).send({ status: false, data:  createdUrl});
        
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
const getUrl= async(req,res)=>{
    try {
        let urlCode=req.params.urlCode
        let foundUrl= await urlModel.findOne({urlCode})
        
        if(!foundUrl){
       return res.status(400).send("no such urlCode exist");
        }
        //res.status(200).send();
       return res.status(302).redirect(foundUrl.longUrl)
    } catch (err) {
        res.status(500).send({ error: err.message });
        
    }
}
 module.exports = { shortenUrl, getUrl }


