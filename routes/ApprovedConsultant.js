const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultantController");

router.get("/", consultantController.getApprovedConsultants);
router.get("/:id", consultantController.getAConsultantDetails);
router.put("/:id", consultantController.updateConsultantDetails);

module.exports = router;
