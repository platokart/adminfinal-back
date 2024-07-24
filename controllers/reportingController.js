exports.getReports = (req, res) => {
    res.send('Reports Home');
  };
  
  exports.getReportById = (req, res) => {
    res.send(`Report with ID: ${req.params.id}`);
  };
  