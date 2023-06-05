var express  = require("express");

var router = express.Router();
var service = require('./userService');

router.post("/add/:role" , service.add);
router.get("/all" , service.getAll);
router.delete("/delete/:id" , service.deleteUser);
router.put("/update/:id", service.update);
router.post("/login" , service.login);
router.get("/logout" , service.logout);
router.get("/userConnected" , service.getUserConnected)

module.exports = router;