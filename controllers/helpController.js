exports.getHelp = (req, res) => {
    res.send('Help Home');
  };
  
  exports.getHelpById = (req, res) => {
    res.send(`Help with ID: ${req.params.id}`);
  };
  