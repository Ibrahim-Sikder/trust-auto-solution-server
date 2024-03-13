const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
require("dotenv").config();
const port = process.env.PORT || 5000;
const addToJobCardRoute = require("./src/Routes/AddToJobCardRoute")
const quotationRoute = require("./src/Routes/QuotationRoute")
const invoiceRoute = require("./src/Routes/InvoiceRoute")
const moneyReceiptRoute = require("./src/Routes/MoneyReceipt")
const customerRoute = require("./src/Routes/CustomerRoute")
const companyRoute = require("./src/Routes/CompanyRoute")
const showRoomRoute = require("./src/Routes/ShowRoomRoute")
const vehicleRoute = require("./src/Routes/VehicleListRoute")

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

app.get("/", (req, res) => {
  res.send("Trust Auto Solution");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
