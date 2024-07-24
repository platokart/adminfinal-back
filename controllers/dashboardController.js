const mongoose = require("mongoose");
const Consultant = require("../models/UnapprovedConsultant");
const Customer = require("../models/Customer");
const Order = require("../models/order");

exports.getTopIndustries = async (req, res) => {
  try {
    const results = await Consultant.aggregate([
      // Match documents where 'industry' field exists and is not null
      {
        $match: {
          "basicdetails.industry": { $exists: true, $ne: [] },
        },
      },
      // Unwind the 'basicdetails' array
      {
        $unwind: "$basicdetails",
      },
      // Unwind the 'industry' array inside 'basicdetails'
      {
        $unwind: "$basicdetails.industry",
      },
      // Group by 'industry' and count occurrences
      {
        $group: {
          _id: { $trim: { input: "$basicdetails.industry" } },
          count: { $sum: 1 },
        },
      },
      // Sort by count in descending order
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
      // Match documents where 'industry' field exists and is not null
      {
        $match: {
          "basicdetails.skills": { $exists: true, $ne: [] },
        },
      },
      // Unwind the 'basicdetails' array
      {
        $unwind: "$basicdetails",
      },
      // Unwind the 'industry' array inside 'basicdetails'
      {
        $unwind: "$basicdetails.skills",
      },
      // Group by 'industry' and count occurrences
      {
        $group: {
          _id: { $trim: { input: "$basicdetails.skills" } },
          count: { $sum: 1 },
        },
      },
      // Sort by count in descending order
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

exports.totalCustomers = async (req, res) => {
  try {
    // Get the total number of customers in the collection
    const count = await Customer.countDocuments();

    res.status(200).json({
      status: "success",
      totalCustomers: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching total number of customers",
      error: error.message,
    });
  }
};
exports.totalConsultants = async (req, res) => {
  try {
    // Get the total number of customers in the collection
    const count = await Consultant.countDocuments();

    res.status(200).json({
      status: "success",
      totalConsultants: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching total number of consultants",
      error: error.message,
    });
  }
};

exports.totalRevenue = async (req, res) => {
  try {
    // Calculate the total revenue
    const result = await Order.aggregate([
      {
        $group: {
          _id: null, // Grouping all documents together
          totalRevenue: { $sum: "$amount" }, // Summing up the 'amount' field
        },
      },
    ]);

    // Extract total revenue from the result
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      status: "success",
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching total revenue",
      error: error.message,
    });
  }
};
