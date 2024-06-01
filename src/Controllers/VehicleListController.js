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

exports.filterCard = async (req, res, next) => {
  try {
    const filterType = req.body.filterType.trim();
    let filteringData = "";

    if (filterType) {
      filteringData = filterType;
    }

    const escapedFilteringData = filteringData.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const searchFields = [
      "chassis_no",
      "engine_no",
      "car_registration_no",
      "fullRegNum",
      "vehicle_name",
    ];

    const searchQuery = Vehicle.find({
      $or: searchFields.map((field) => ({
        [field]: { $regex: escapedFilteringData, $options: "i" },
      })),
    });

    const vehicle = await searchQuery.exec();

    if (!vehicle || vehicle.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: vehicle });
  } catch (error) {
    next(error);
  }
};
exports.getVehicleProfile = async (req, res) => {
  try {
    const id = req.params.id;
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    let perPage;
    if (limit) {
      perPage = limit;
    } else {
      perPage = 10;
    }

    const skip = Math.max((page - 1) * perPage);

    const allVehicle = await Vehicle.aggregate([
      { $match: { Id: id } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ]);

    const totalData = await Vehicle.countDocuments({ Id: id });
    const totalPages = Math.ceil(totalData / perPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    res.status(200).json({ allVehicle, pageNumbers, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicle = await Vehicle.findOne({ _id: id });
    res.status(200).json(vehicle);
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
