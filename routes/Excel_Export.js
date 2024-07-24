const ExcelJS = require("exceljs");
const Consultant = require("../models/UnapprovedConsultant");

async function fetchData() {
  try {
    const consultants = await Consultant.find({});
    console.log("Consultants fetched:", consultants[0]); // Log the first fetched document to inspect structure
    return consultants;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

async function generateExcel(consultants) {
  const workbook = new ExcelJS.Workbook();
  const consultantsSheet = workbook.addWorksheet("Consultant");

  // Define the columns in the desired order and their corresponding paths in the data object
  const columnsOrder = [
    { header: "_id", key: "_id" },
    { header: "Timestamp", key: "data.Timestamp" },
    { header: "data.Username", key: "data.Username" },
    { header: "Name", key: "data.Name" },
    { header: "Contact Number", key: "data.Contact Number" },
    {
      header: "Name of the organization",
      key: "data.Name of the organization",
    },
    {
      header: "Industry working /Worked in (Mark most recent 3)",
      key: "data.Industry working /Worked in (Mark most recent 3)",
    },
    {
      header: "If marked 'others' in previous question - please fill",
      key: "data.If marked 'others' in previous question - please fill",
    },
    { header: "Designation", key: "data.Designation" },
    {
      header: "If Other – Please mention",
      key: "data.If Other – Please mention",
    },
    {
      header: "Number of years of experience",
      key: "data.Number of years of experience",
    },
    {
      header: "Specify key words - skills and expertise",
      key: "data.Specify key words - skills and expertise",
    },
    {
      header: "Highest education qualification",
      key: "data.Highest education qualification",
    },
    {
      header: "Year of passing of Highest education",
      key: "data.Year of passing of Highest education",
    },
    {
      header: "Institute / University Name",
      key: "data.Institute / University Name",
    },
    { header: "Function", key: "data.Function" },
    {
      header: "If marked 'Others' in previous question – please mention",
      key: "data.If marked 'Others' in previous question – please mention",
    },
    {
      header:
        "Share about yourself in 250 words which will highlight your expertise for clients to leverage and will be part of your profile page",
      key: "data.Share about yourself in 250 words which will highlight your expertise for clients to leverage and will be part of your profile page",
    },
    {
      header: "Profile Photo (High resolution Professional photo)",
      key: "data.Profile Photo (High resolution Professional photo)",
    },
    {
      header: "Most recently updated resume",
      key: "data.Most recently updated resume",
    },
    {
      header: "Share your LinkedIn profile link",
      key: "data.Share your LinkedIn profile link",
    },
    {
      header:
        "Fee per session for the consultation you can provide as per your area of expertise",
      key: "data.Fee per session for the consultation you can provide as per your area of expertise",
    },
    { header: "Mark your availability", key: "data.Mark your availability" },
  ];

  // Set columns for the worksheet
  consultantsSheet.columns = columnsOrder.map((col) => ({
    header: col.header,
    key: col.header,
    width: 30,
  }));

  // Add rows to the worksheet
  consultants.forEach((consultant) => {
    // Extract data and add the _id separately
    const rowData = { _id: consultant._id.toString() }; // Convert ObjectId to string

    columnsOrder.slice(1).forEach((col) => {
      rowData[col.header] = getNestedProperty(consultant, col.key) || "";
    });

    console.log("Row data:", rowData); // Log the row data
    consultantsSheet.addRow(rowData);
  });

  const filePath = "Unapproved_consultant_data50.xlsx";
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

async function exportData(req, res) {
  try {
    const consultants = await fetchData();
    const filePath = await generateExcel(consultants);
    console.log("Successfully exported data");
    res.download(filePath, "Unapproved_consultant_data50.xlsx", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("Error exporting data");
  }
}

module.exports = exportData;
