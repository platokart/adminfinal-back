exports.getPlatforms = (req, res) => {
    res.send('Platforms Home');
  };
  
  exports.getPlatformById = (req, res) => {
    res.send(`Platform with ID: ${req.params.id}`);
  };
  