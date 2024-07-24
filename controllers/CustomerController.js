const Customer = require("../models/Customer");
const mongoose = require("mongoose");

exports.getAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching consultants",
      error: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
