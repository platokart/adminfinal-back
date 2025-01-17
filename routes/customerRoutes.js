const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

router.get("/", CustomerController.getAllCustomer);
router.post("/:id", CustomerController.getCustomerById);

module.exports = router;
