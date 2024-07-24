exports.getProjects = (req, res) => {
    res.send('Projects Home');
  };
  
  exports.getProjectById = (req, res) => {
    res.send(`Project with ID: ${req.params.id}`);
  };
  