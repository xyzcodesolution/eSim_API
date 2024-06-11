const userModel =  require("../controllers/userModel.js");
const { Router } = require("express");
const router = Router();

router.post("/signup",userModel.create);
router.post("/signin",userModel.login);

module.exports =  router