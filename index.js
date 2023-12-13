const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
require("dotenv").config();
const port = process.env.PORT || 5000;
const addToJobCardRoute = require("./src/Routes/AddToJobCardRoute")
const quotationRoute = require("./src/Routes/QuotationRoute")
const invoiceRoute = require("./src/Routes/InvoiceRoute")

// middleware
app.use(cors());
app.use(express.json());
dbConnect();


app.use("/api/v1", addToJobCardRoute);
app.use("/api/v1", quotationRoute);
app.use("/api/v1", invoiceRoute);

app.get("/", (req, res) => {
  res.send("Trust Auto Solution");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
