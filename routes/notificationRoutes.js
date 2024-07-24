const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define your routes here

router.get('/', notificationController.getNotifications);
router.get('/:id', notificationController.getNotificationById);

module.exports = router;
