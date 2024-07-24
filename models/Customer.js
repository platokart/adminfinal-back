const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
