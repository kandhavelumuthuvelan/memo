const mongoose = require('mongoose');
const db = require("../models");
const config = require("../config/db.config");

const Role = db.role;

mongoose.connect(config.HOST, {useUnifiedTopology: true,useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
initial();
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
 
function initial()
{
Role.estimatedDocumentCount((err,count)=>{
    if(!err&&count===0)
    {
        new Role({
            name:"user"
        }).save(err=>{
            if(err)
            {
                console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        })
        new Role({
            name:"admin"
        }).save(err=>{
            if(err)
            {
                console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
        })
    }
});
}