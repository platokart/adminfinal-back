const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultantController");

router.get("/", consultantController.getUnapprovedConsultants);
router.get("/:id", consultantController.getConsultantDetails);
router.post("/allow/:id", consultantController.getApproved);

module.exports = router;
