const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        FirstName : String,
        LastName : String,
        Username : String,
        phone : Number,
        email : String,
        password : String,
        image : String,
    role:{
        type : String,
        default : "user",
        enum: ["superadmin","admin","user"]
    },
    authTokens: [{
        authToken : {
            type : String,
            required : true
        }
    }]
});

module.exports = mongoose.model('user',User);