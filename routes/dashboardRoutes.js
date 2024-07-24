const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();

router.get("/top-industries", dashboardController.getTopIndustries);
router.get("/consultant-expertise", dashboardController.consultantExpertise);

module.exports = router;
