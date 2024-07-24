const express = require('express');
const router = express.Router();
const reportingController = require('../controllers/reportingController');


router.get('/', reportingController.getReports);
router.get('/:id', reportingController.getReportById);

module.exports = router;
