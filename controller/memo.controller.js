const db = require("../models");
const Memo = db.memo;
const Expiry=db.expiry;
const Mapping=db.mapping;
const User = db.user;

exports.create=(req,res)=>{
    const memo = new Memo({
        taskName:req.body.taskName,
      //  expiry: new Date(req.body.expiry),
        status:req.body.status,
        memoId:req.body.memoId
      });

      memo.save((err,memo)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }   
          const expiry =new Expiry({

            expiryat: new Date(req.body.expiry),
            memoId:memo._id
          });
          expiry.save((err,doc)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
              }   
              else
              {
              const mapping =new Mapping({
                username: req.body.username,
                memoId:memo._id
              });
              mapping.save((err,mapdoc)=>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }   
                 
              });
              
            }
              
          });
          res.send({ message: memo });
        });
}

exports.delete=(req,res)=>{

    Memo.findOne({memoId:req.params.id},(err,memodoc)=>{
        
        if(err)
        {
            res.status(500).send({ message: err });
            return;
        }
else
{
    Memo.findOneAndDelete({memoId:req.params.id},(err,doc)=>{
        if(err)
        {
            console.log("error",err) 
            res.status(500).send({ message: err });
            return;
        }
   
   });
   Expiry.findOneAndDelete({memoId:memodoc._id},(err,doc)=>{
    if(err)
    {
        console.log("error",err) 
        res.status(500).send({ message: err });
        return;
    }
});
Mapping.findOneAndDelete({memoId:memodoc._id},(err,doc)=>{
    if(err)
    {
        console.log("error",err) 
        res.status(500).send({ message: err });
        return;
    }
    else
    {
        res.send({ message: "delete sucessfully" });
   }
});
}
});
}


exports.update=(req,res)=>{
        Memo.findOneAndUpdate({memoId:req.params.id},req.body,{ new: true,upsert: true },(err,doc)=>{
            if(err)
            {
                console.log("error",err) 
                res.status(500).send({ message: err });
                return;
            }
            else
            {
                Expiry.findOneAndUpdate({memoId:doc._id},{expiryat:req.body.expiry},{ new: true,upsert: true },(err,doc)=>{

                    if(err)
                    {
                        console.log("error",err) 
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: doc });
                });


               
           }
        });
}

exports.read=(req,res)=>{
    if(req.role=="admin")
    {
    Memo.find({},(err,doc)=>{
        if(err)
        {
            console.log("error",err) 
            res.status(500).send({ message: err });
            return;
        }
        else
        {
            res.send({ message: doc });
       }

    });
}
else{

    User.findById(req.userId,(err,doc)=>{
        if(err)
        {
            console.log("error",err) 
            res.status(500).send({ message: err });
            return;
        }
            Mapping.find({username:doc.username}).populate('memoId').exec((err,memo)=>{
            if(err)
            {
            res.status(500).send({ message: "usernotfound" });
             return;
            }
             res.send({ message: memo });
            });
            

    });
}
}