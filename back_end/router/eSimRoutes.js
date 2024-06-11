const eSimModel =  require("../controllers/eSimModel.js");
const { Router } = require("express");
const router = Router();

router.post("/prepaid_package_template", eSimModel.prepaid_package_template); 

module.exports = router;