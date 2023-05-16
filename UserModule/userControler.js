var express  = require("express");

var router = express.Router();
var service = require('./userService');

router.post("/add/:role" , service.add);
router.get("/all" , service.getAll);
router.delete("/delete/:id" , service.deleteUser);
router.put("/update/:id", service.update)

module.exports = router;