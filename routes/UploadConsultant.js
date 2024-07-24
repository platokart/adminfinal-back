const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Consultant = require("../models/UnapprovedConsultant");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("Application.csv"), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      const industry = [
        data["Industry working /Worked in (Mark most recent 3)"] || "",
        data["If marked 'others' in previous question - please fill"] || "",
      ]
        .filter(Boolean)
        .join(", ");
      const designation = [
        data["Designation "] || "",
        data["If Other - Please mention"] || "",
      ]
        .filter(Boolean)
        .join(", ");
      const functionField = [
        data["Function"] || "",
        data["If marked 'Others' in previous question - please mention"] || "",
      ]
        .filter(Boolean)
        .join(", ");
      const availability = [
        data["Mark your availability"] || "",
        data[
          "Please provide details if marked 'custom specify' in previous question"
        ] || "",
      ]
        .filter(Boolean)
        .join(", ");

      const transformedData = {
        email: data["Username"] || "",
        basicdetails: [
          {
            firstName: data["Name"] || "N/A",
            lastName: data["Last Name"] || "N/A",
            orgName: data["Name of the organization "] || "N/A",
            industry: industry.split(", ").filter(Boolean),
            designation: designation || "N/A",
            functionName: functionField || "N/A",
            skills: (data["Specify  key words - skills and expertise "] || "")
              .split(", ")
              .filter(Boolean),
            yearsOfExperience: data["Number of years of experience"] || "N/A",
            highestEducation: data["Highest education qualification"] || "N/A",
            yearOfPassing:
              data["Year of passing of Highest education"] || "N/A",
            instituteName: data["Institute / University Name "] || "N/A",
            photo:
              data["Profile Photo (High resolution Professional photo)"] ||
              "N/A",
          },
        ],
        additionalDetails: [
          {
            aboutYourself:
              data[
                "Share about yourself in 250 words which will highlight your expertise for clients to leverage and will be part of your profile page"
              ] || "N/A",
            resumeAttachment: data["Most recently updated resume"] || "N/A",
            linkedinProfile: data["Share your LinkedIn profile path"] || "N/A",
            feePerSession:
              data[
                "Fee per session for the consultation you can provide as per your area of expertise"
              ] || "N/A",
            lastCTC: data["Current / Last drawn CTC value (Annual)"] || "N/A",
            compensationDetails:
              data[
                "Your current / last drawn salary credentials / supporting documents"
              ] || "N/A",
          },
        ],
        criticalDetails: [
          {
            makeYourAvailability: availability.split(", ").filter(Boolean),
            provideTimeAvailability:
              data[
                "Provide time availability as per chosen day availability slot in previous question"
              ] || "N/A",
          },
        ],
        paymentDetails: [
          {
            bankAccountNumber: data["Bank account number"] || "N/A",
            ifscCode: data["Bank IFSC code"] || "N/A",
            bankName: data["Bank Name"] || "N/A",
            bankBranch: data["Branch address"] || "N/A",
            cancelledCheque: data["Cancelled cheque scan copy"] || "N/A",
            panNumber:
              data[
                "PAN number (ensure Name is same appearing in bank credentials and PAN card)"
              ] || "N/A",
          },
        ],
        passwordDetails: [
          {
            password: "123456789" || "N/A", // Assuming password is in CSV for demonstration
          },
        ],
        registrationStatus: "pending",
      };
      results.push(transformedData);
    })
    .on("end", () => {
      Consultant.insertMany(results)
        .then(() => {
          res.status(200).json({ message: "File uploaded successfully" });
        })
        .catch((error) => {
          res
            .status(500)
            .send("Error registering consultants: " + error.message);
        });
    });
});

module.exports = router;
