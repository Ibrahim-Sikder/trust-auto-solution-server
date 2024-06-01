const ShowRoomList = require("../Models/ShowRoom");
const { generateShowRoomId } = require("./utils/showRoomId");

exports.createShowRoomDetails = async (req, res, next) => {
  try {
    const showRoomListCreated = new ShowRoomList(req.body);

    showRoomListCreated.showRoomId = await generateShowRoomId();

    const result = await showRoomListCreated.save();
    res.status(200).json({
      message: "Successfully add to show room post",
      result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getShowRoom = async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    const perPage = 10;
    const skip = Math.max((page - 1) * perPage);

    const allShowRoom = await ShowRoomList.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ]);

    const totalData = await ShowRoomList.countDocuments();
    const totalPages = Math.ceil(totalData / perPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    res.status(200).json({ allShowRoom, pageNumbers, totalPages });
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
      "showRoomId",
      "showRoom_name",
      "car_registration_no",
      "fullRegNum",
      "fullCompanyNum",
      "company_contact",
    ];

    const searchQuery = ShowRoomList.find({
      $or: searchFields.map((field) => ({
        [field]: { $regex: escapedFilteringData, $options: "i" },
      })),
    });

    const showRoom = await searchQuery.exec();

    if (!showRoom || showRoom.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: showRoom });
  } catch (error) {
    next(error);
  }
};

exports.getShowRoomProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const showRoom = await ShowRoomList.findOne({ showRoomId: id });

    res.status(200).json(showRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;

    const showRoom = await ShowRoomList.findOne({ _id: id });
    res.status(200).json(showRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;

    const updateInfo = await ShowRoomList.updateMany(
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
exports.deleteShowRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const showRoom = await ShowRoomList.deleteOne({ _id: id });
    res.status(200).json({ message: "Show room card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
