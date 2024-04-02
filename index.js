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

const multer = require("multer");

const cloudinary = require("./src/utils/cloudinary");

const streamifier = require("streamifier"); // Import the streamifier library

const path = require("path");
const fs = require("fs");
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

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

 

app.post("/api/v1/uploads", upload.single("image"), async (req, res) => {
  try {
    // Check if there was an error during file upload
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create a Buffer from the file buffer
    const fileBuffer = Buffer.from(req.file.buffer);

    // Upload image directly to Cloudinary using the file buffer
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "image_file" },
        (error, result) => {
          if (error) {
            return res.status(500).json({
              error: "An error occurred while uploading to Cloudinary.",
            });
          }

          // Do something with the Cloudinary result (e.g., save the URL to a database)
          const image_url = result.secure_url;
          res.json({ message: "Image uploaded successfully", image_url });
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
