var express  = require("express");

var router = express.Router();
var service = require('./userService')

router.post("/add" , service.add)

module.exports = router;