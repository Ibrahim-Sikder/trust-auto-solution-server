const Company = require("../Models/Company");
const { generateCompanyId } = require("./utils/companyId");

exports.createCompanyDetails = async (req, res, next) => {
  try {
    const companyCreated = new Company(req.body);

    companyCreated.companyId = await generateCompanyId();

    const result = await companyCreated.save();

    res.status(200).json({
      message: "Successfully add to company post",
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyData = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const perPage = 10;
    const skip = Math.max((page - 1) * perPage);

    const allCompany = await Company.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ]);

    const totalData = await Company.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    res.status(200).json({ allCompany, pageNumbers, totalPages });
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
      "companyId",
      "company_name",
      "car_registration_no",
      "fullRegNum",
      "vehicle_name",
      "fullCompanyNum",
      "company_contact",
    ];

    const searchQuery = Company.find({
      $or: searchFields.map((field) => ({
        [field]: { $regex: escapedFilteringData, $options: "i" },
      })),
    });

    const company = await searchQuery.exec();

    if (!company || company.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: company });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const company = await Company.findOne({ companyId: id });
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

exports.getSpecificCard = async (req, res, next) => {
  try {
    const id = req.params.id;

    const company = await Company.findOne({ _id: id });
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

exports.updateCard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;

    const updateInfo = await Company.updateOne(
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
exports.deleteCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    const company = await Company.deleteOne({ _id: id });
    res.status(200).json({ message: "Company card delete successful" });
  } catch (error) {
    next(error);
  }
};
