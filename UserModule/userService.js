const error = require("mongoose/lib/error")
var user = require("./userModal")


async function add(req, res,next){

    const imagee =req.body.image

    const newUser = new user({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Username:req.body.Username,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        //role: req.params.role,
        image: req.body.image
    })
    newUser.save()
    .then(
        ()=>{            
            console.log(newUser);                
            res.end();
        })
    .catch((error)=> {
        console.log(error);
        res.status(500).json({ message: "Error during creating user "});
        res.end();    
    })
}


module.exports = {
    add
}