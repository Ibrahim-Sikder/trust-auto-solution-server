const Vehicle = require("../Models/VehicleList");

exports.createVehicleDetails = async (req, res) => {
  try {
    const vehicleCreated = new Vehicle(req.body);
    const result = await vehicleCreated.save();
    res.status(200).json({
      message: "Successfully add to vehicle post",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getVehicleData = async (req, res) => {
  try {
    const allPost = await Vehicle.find({}).sort({
      createdAt: -1,
    });
    if (allPost.length === 0) {
      return res.json({
        message: "No card found.",
      });
    }
    res.json(allPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filterCard = async (req, res) => {
  try {
    const { filterType } = req.body;
    console.log(filterType);

    const isNumeric = !isNaN(Number(filterType));
    const filterValue = isNumeric ? Number(filterType) : filterType;

    let customer;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      customer = await Vehicle.find({
        $or: [
          { customer_name: { $regex: filterType, $options: "i" } },
          { date: { $regex: filterType, $options: "i" } },
          { car_registration_no: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      customer = await Vehicle.find({
        $or: [{ job_no: filterValue }, { customer_contact: filterValue }],
      });
    }

    if (!customer || customer.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getVehicleProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle = await Vehicle.find({
      $or: [{ customerId: id }, { companyId: id }],
    });
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await Vehicle.findOne({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Vehicle.updateMany(
      { _id: id },
      {
        $set: updateCard,
      },
      { runValidators: true }
    );
    res.status(200).json({
      message: "Successfully update card.",
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Vehicle.deleteOne({ _id: id });
    res.status(200).json({ message: "Customer card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
