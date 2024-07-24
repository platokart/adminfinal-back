exports.getBillings = (req, res) => {
    res.send('Billing Home');
  };
  
  exports.getBillingById = (req, res) => {
    res.send(`Billing with ID: ${req.params.id}`);
  };
  