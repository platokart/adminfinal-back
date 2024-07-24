const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

router.get('/', helpController.getHelp);
router.get('/:id', helpController.getHelpById);
module.exports = router;
