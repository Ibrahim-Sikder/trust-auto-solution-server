const Customer = require("../Models/Customer");
const { generateCustomerId } = require("./utils/customerId");

exports.createCustomerDetails = async (req, res, next) => {
  try {
    const customerCreated = new Customer(req.body);

    customerCreated.customerId = await generateCustomerId();

    const result = await customerCreated.save();
    res.status(200).json({
      message: "Successfully add to customer post",
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerData = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    const perPage = 10;
    const skip = Math.max((page - 1) * perPage);

    const allCustomer = await Customer.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ]);

    const totalData = await Customer.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    res.status(200).json({ allCustomer, pageNumbers, totalPages });
  } catch (error) {
    next(error);
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
      "customerId",
      "customer_name",
      "car_registration_no",
      "fullRegNum",
      "vehicle_name",
      "fullCustomerNum",
      "customer_contact",
    ];

    const searchQuery = Customer.find({
      $or: searchFields.map((field) => ({
        [field]: { $regex: escapedFilteringData, $options: "i" },
      })),
    });

    const customer = await searchQuery.exec();

    if (!customer || customer.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: customer });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ customerId: id });
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

exports.getSpecificCard = async (req, res, next) => {
  try {
    const id = req.params.id;

    const customer = await Customer.findOne({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

exports.updateCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;

    const updateInfo = await Customer.updateOne(
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
    next(error);
  }
};
exports.deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.deleteOne({ _id: id });
    res.status(200).json({ message: "Customer card delete successful" });
  } catch (error) {
    next(error);
  }
};
