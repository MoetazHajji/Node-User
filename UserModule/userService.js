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
        role: req.params.role,
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

async function getAll(req,res,next){
    user.find((err,obj)=>{
        if(err){
            console.log(err);
        }
        console.log(obj);
        res.json(obj)
    }); 
}

async function deleteUser(req,res,next){
     user.findOne({_id:req.params.id} , (err,obj)=>{
        console.log(obj)        
    })
    .deleteOne();
    res.end();
}

async function update(req,res,next){
    await user.findByIdAndUpdate(
        req.params.id,
        {
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        phone:req.body.phone,
        email:req.body.email
        },
        {
            new:true
        });
        console.log(res)
        res.end();
}


module.exports = {
    add,
    getAll:getAll,
    deleteUser,
    update

}