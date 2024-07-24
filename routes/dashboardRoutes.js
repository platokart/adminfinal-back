const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();
router.get("/totalcustomers", dashboardController.totalCustomers);
router.get("/totalconsultants", dashboardController.totalConsultants);
router.get("/top-industries", dashboardController.getTopIndustries);
router.get("/consultant-expertise", dashboardController.consultantExpertise);
router.get("/total-revenue", dashboardController.totalRevenue);
module.exports = router;
