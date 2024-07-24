const mongoose = require("mongoose");
const Consultant = require("../models/UnapprovedConsultant");

exports.getTopIndustries = async (req, res) => {
  try {
    const results = await Consultant.aggregate([
      {
        $match: {
          "data.Industry working /Worked in (Mark most recent 3)": {
            $ne: null,
          },
        },
      },
      {
        $project: {
          industries: {
            $split: [
              "$data.Industry working /Worked in (Mark most recent 3)",
              ",",
            ],
          },
        },
      },
      {
        $unwind: "$industries",
      },
      {
        $group: {
          _id: { $trim: { input: "$industries" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching data",
      error: err.message,
    });
  }
};

exports.consultantExpertise = async (req, res) => {
  try {
    const results = await Consultant.aggregate([
      {
        $match: {
          "data.Specify  key words - skills and expertise ": {
            $ne: null,
          },
        },
      },
      {
        $project: {
          skills: {
            $split: ["$data.Specify  key words - skills and expertise ", ","],
          },
        },
      },
      {
        $unwind: "$skills",
      },
      {
        $group: {
          _id: { $trim: { input: "$skills" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching data",
      error: err.message,
    });
  }
};
