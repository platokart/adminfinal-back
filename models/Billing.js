const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'Billing must belong to a client'],
  },
  amount: {
    type: Number,
    required: [true, 'Billing must have an amount'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Billing = mongoose.model('Billing', billingSchema);
module.exports = Billing;
