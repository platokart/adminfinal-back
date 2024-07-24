exports.getNotifications = (req, res) => {
    res.send('Notifications Home');
  };
  
  exports.getNotificationById = (req, res) => {
    res.send(`Notification with ID: ${req.params.id}`);
  };
  