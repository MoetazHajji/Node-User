const error = require("mongoose/lib/error")
var user = require("./userModal")
const bcrypt = require("bcryptjs");
// import JsonWebToken
var jwt = require('jsonwebtoken');
const { token } = require("morgan");
const jwt_secret_key= "mykey";


async function add(req, res,next){

    const imagee =req.body.image

    const newUser = new user({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Username:req.body.Username,
        phone:req.body.phone,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password),
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

async function login(req, res, next){
    const password = req.body.password;
    try{
        (userExisting = await user.findOne({Username:req.body.Username})),
        (err,usr) => {
            if(err){
                console.log(err);
            }else
                console.log(usr);
        };
    } catch (err){
        return new Error(err);
    }
    if (userExisting == null) {
        return res.status(400).json({ message: "Inexistant user" });
    }

    const comparepwd = bcrypt.compareSync(password , userExisting.password);

    if(comparepwd == false){
        return res.status(400).json({message : 'Wrong Password '})
    }

    const authToken = jwt.sign(
        {
            id:userExisting._id,
            role:userExisting.role,
            password:userExisting.password,
            Username:userExisting.Username,
            FirstName:userExisting.FirstName,
            LastName:userExisting.LastName,
            email:userExisting.email,
            phone:userExisting.phone
        },
        jwt_secret_key,
        {expiresIn: '1hr' },
        { algorithm: 'RS256' }
    );

    res.cookie("token" , authToken,{
        path:"/",
        expires: new Date(Date.now() + 1000 * 60 * 60), //30 seconds
        httpOnly: true,
        sameSite : "lax"
    })

    //req.session.sessionId = userExisting.Username;
    userExisting.authTokens.push({authToken});
    await userExisting.save();
    return res.status(200).json({message: "Succefully loged in " , userExisting , token})
}


module.exports = {
    add,
    getAll:getAll,
    deleteUser,
    update,
    login

}