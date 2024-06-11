const payment_gateway =  require("../utils/payment_gateway");
const { Router } = require("express");
const router = Router();

router.post("/create-payment-intent", payment_gateway.validateVisaCard); 

module.exports =  router;