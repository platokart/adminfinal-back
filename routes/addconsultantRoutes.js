const express = require("express");
const router = express.Router();
const addconsultantController = require("../controllers/addconsultantController");

router.get("/", addconsultantController.addConsultantPage);
router.post("/", addconsultantController.addConsultantDetails);

module.exports = router;
