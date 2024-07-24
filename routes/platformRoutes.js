const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platformController');

router.get('/', platformController.getPlatforms);
router.get('/:id', platformController.getPlatformById);

module.exports = router;
