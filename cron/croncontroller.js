const db = require("../models");
const controller=require("../mail/sentmail");
const Memo = db.memo;
const Expiry=db.expiry;
const Mapping=db.mapping;
const User = db.user;

var _this = this;
var DateDiff = require('date-diff');
exports.maillist=()=>{
    console.log("docs");
Expiry.find({},(err,doc)=>{
    if(err)
    {
        console.log("error",err)
        return;
    }
    else
    {
        doc.map(doc=>{
            console.log(doc.expiryat);
            var date1 = new Date();
            var date2=new Date(doc.expiryat)
            var res = Math.abs(date1 - date2) / 1000;
            var days = Math.floor(res / 86400);
            if(days<=1)
            {
               
                _this.getusermailid(doc.memoId)
            } 
        })
   }
});
}

exports.getusermailid=(memoid,next)=>{
    Mapping.findOne({memoId:memoid},(err,userdata)=>{
        if(!err)
        {
            User.findOne({username:userdata.username},(err,maildata)=>{
                console.log(maildata.email);
                controller.sentmail(maildata.email);
            });
        }
    });

}
