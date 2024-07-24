const UnapprovedConsultant = require("../models/UnapprovedConsultant");
const ApprovedConsultant = require("../models/ApprovedConsultant");
const mongoose = require("mongoose");

exports.getUnapprovedConsultants = async (req, res) => {
  try {
    const consultants = await UnapprovedConsultant.find();
    res.json(consultants);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching consultants",
      error: error.message,
    });
  }
};
exports.getApproved = async (req, res) => {
  try {
    const consultantId = req.params.id;
    const consultant = await UnapprovedConsultant.findById(consultantId);

    if (consultant) {
      const approvedConsultant = new ApprovedConsultant(consultant.toObject());
      await approvedConsultant.save();
      await UnapprovedConsultant.deleteOne({ _id: consultantId });
      res.json("Consultant approved and moved to approved collection.");
    } else {
      res.status(404).send("Consultant not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getConsultantDetails = async (req, res) => {
  try {
    const consultantId = req.params.id;
    const consultant = await UnapprovedConsultant.findById(consultantId);

    if (consultant) {
      res.json(consultant);
    } else {
      res.status(404).send("Consultant not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getAConsultantDetails = async (req, res) => {
  try {
    const consultantId = req.params.id;
    const consultant = await ApprovedConsultant.findById(consultantId);

    if (consultant) {
      res.json(consultant);
    } else {
      res.status(404).send("Consultant not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getApprovedConsultants = async (req, res) => {
  try {
    const consultants = await ApprovedConsultant.find();
    res.json(consultants);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching consultants",
      error: error.message,
    });
  }
};
exports.updateConsultantDetails = async (req, res) => {
  try {
    const consultantId = req.params.id;
    const { feePerSession } = req.body;

    const consultant = await ApprovedConsultant.findById(consultantId);
    if (consultant) {
      // Update the feePerSession in additionalDetails
      if (
        consultant.additionalDetails &&
        consultant.additionalDetails.length > 0
      ) {
        consultant.additionalDetails[0].feePerSession = feePerSession;
      } else {
        consultant.additionaldetails = [{ feePerSession }];
      }

      await consultant.save();
      res.json({ message: "Consultant details updated successfully" });
    } else {
      res.status(404).send("Consultant not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
