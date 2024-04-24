const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
require("dotenv").config();

const port = process.env.PORT || 5000;

const addToJobCardRoute = require("./src/Routes/AddToJobCardRoute");
const quotationRoute = require("./src/Routes/QuotationRoute");
const invoiceRoute = require("./src/Routes/InvoiceRoute");
const moneyReceiptRoute = require("./src/Routes/MoneyReceipt");
const customerRoute = require("./src/Routes/CustomerRoute");
const companyRoute = require("./src/Routes/CompanyRoute");
const showRoomRoute = require("./src/Routes/ShowRoomRoute");
const vehicleRoute = require("./src/Routes/VehicleListRoute");
const supplierRoute = require("./src/Routes/SupplierRoute");
const employeeRoute = require("./src/Routes/EmployeeRoute");
const expenseRoute = require("./src/Routes/ExpenseRoute");

const multer = require("multer");

const cloudinary = require("./src/utils/cloudinary");

 
// middleware
app.use(cors());
app.use(express.json());
dbConnect();

app.use("/api/v1", addToJobCardRoute);
app.use("/api/v1", quotationRoute);
app.use("/api/v1", invoiceRoute);
app.use("/api/v1", moneyReceiptRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", companyRoute);
app.use("/api/v1", showRoomRoute);
app.use("/api/v1", vehicleRoute);
app.use("/api/v1", supplierRoute);
app.use("/api/v1", employeeRoute);
app.use("/api/v1", expenseRoute);

 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/api/v1/uploads", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create a Buffer from the file buffer
    const fileBuffer = Buffer.from(req.file.buffer);

    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "image_file" },
        (error, result) => {
          if (error) {
            return res.status(500).json({
              error: "An error occurred while uploading.",
            });
          }

          const image_url = result.secure_url;
          res.json({ message: "Image uploaded successful", image_url });
        }
      )
      .end(fileBuffer); // Pass the file buffer to the upload stream
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});



app.get("/", (req, res) => {
  res.send("Trust Auto Solution");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
