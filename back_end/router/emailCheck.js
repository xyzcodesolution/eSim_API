const emailCheck =  require("../controllers/emailCheck.js");
const { Router } = require("express");
const router = Router();

router.post("/send-email",emailCheck.emailValidator); 

module.exports =  router;