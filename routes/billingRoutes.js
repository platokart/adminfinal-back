const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.get('/', billingController.getBillings);
router.get('/:id', billingController.getBillingById);

module.exports = router;
