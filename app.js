const express = require("express");
const app = express();
const cors = require("cors");

const Excel_Export = require("./routes/Excel_Export");
// const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
  })
);
// function isAdmin(req, res, next) {
//   if (req.isAuthenticated() && req.user.role === "admin") {
//     return next();
//   }
//   res.redirect("/login");
// }

const dashboardRoutes = require("./routes/dashboardRoutes");
const UnapprovedConsultant = require("./routes/UnapprovedConsultant");
const ApprovedConsultant = require("./routes/ApprovedConsultant");
const UploadConsultant = require("./routes/UploadConsultant");
const customerRoutes = require("./routes/customerRoutes");
const projectRoutes = require("./routes/projectRoutes");
const billingRoutes = require("./routes/billingRoutes");
const reportingRoutes = require("./routes/reportingRoutes");
const platformRoutes = require("./routes/platformRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const helpRoutes = require("./routes/helpRoutes");
const UploadArticle = require("./routes/UploadArticle");

app.use("/admin/dashboard", dashboardRoutes);
app.use("/admin/UnapprovedConsultant", UnapprovedConsultant);
app.use("/admin/approvedConsultant", ApprovedConsultant);
app.use("/admin/consultantUpload", UploadConsultant);
app.use("/admin/customer", customerRoutes);
app.use("/admin/projects", projectRoutes);
app.use("/admin/billing", billingRoutes);
app.use("/admin/reporting", reportingRoutes);
app.use("/admin/platform", platformRoutes);
app.use("/admin/notifications", notificationRoutes);
app.use("/admin/help", helpRoutes);
app.use("/admin/new-article", UploadArticle);
app.use("/admin/export", Excel_Export);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
