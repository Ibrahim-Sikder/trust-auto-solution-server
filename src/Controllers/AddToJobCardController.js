const AddToJobCard = require("../Models/AddToJobCard");

exports.createAddToJobCard = async (req, res) => {
  try {
    const addToCardPost = new AddToJobCard(req.body);
console.log(addToCardPost)
    const result = await addToCardPost.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully add to card post",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await AddToJobCard.updateMany(
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

exports.getAllAddToJobCard = async (req, res) => {
  try {
    const username = req.params.username;
    const allJobCard = await AddToJobCard.find({ username }).sort({
      createdAt: -1,
    });
    if (allJobCard.length === 0) {
      return res.json({
        message: "No job card found.",
      });
    }
    res.json(allJobCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.filterCard = async (req, res) => {
  try {
    const username = req.params.username;
    const { select, filterType } = req.body;
    console.log(req.body);
    if (username !== username) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    let query = {};

    if (select === "Customer Name") {
      query.customer_name = { $regex: new RegExp(filterType, "i") };
    }
    if (select === "Order Number") {
      const numericFilterType = parseInt(filterType, 10);

      if (!isNaN(numericFilterType)) {
        query.job_no = numericFilterType;
      } else {
        return res.status(400).json({ error: "Invalid filterType for SL No" });
      }
    }
    if (select === "Car Number") {
      query.car_registration_no = { $regex: new RegExp(filterType, "i") };
    }
    if (select === "Mobile Number") {
      const numericFilterType = parseInt(filterType,10);

      if (!isNaN(numericFilterType)) {
        query.phone_number = numericFilterType;
      } else {
        return res
          .status(400)
          .json({ error: "Invalid filterType for this phone number" });
      }
    }

    // Perform the MongoDB query with the constructed filter
    const result = await AddToJobCard.find(query);
    if (!result || result.length === 0) {
      // Send a success message with an empty result array
      return res.status(200).json({ message: "No matching found", result: [] });
    }
    // Send the result as JSON response
    console.log(result)
    res.json({message:"Filter successful",result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getRecentPostAddToJobCard = async (req, res) => {
  try {
    const recentPostJobCard = await AddToJobCard.find({})
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentPostJobCard.length === 0) {
      return res.json({
        message: "No recent job card found.",
      });
    }

    res.json(recentPostJobCard[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getRecentAddToJobCard = async (req, res) => {
  try {
    const recentJobCard = await AddToJobCard.find({})
      .sort({ job_no: -1 })
      .limit(1);

    if (recentJobCard.length === 0) {
      return res.json({
        message: "No recent job card found.",
      });
    }

    res.json(recentJobCard[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getPreviewJobCard = async (req, res) => {
  try {
    const id = req.params.id;
    const jobCard = await AddToJobCard.findOne({ _id: id });
  
    // if (jobCard.length === 0) {
    //   return res.json({
    //     message: "No job card found.",
    //   });
    // }

    res.status(200).json(jobCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getPreviewJobNoCard = async (req, res) => {
  try {
    const job_no = req.params.job_no;
    const jobCard = await AddToJobCard.findOne({job_no });
  
    // if (jobCard.length === 0) {
    //   return res.json({
    //     message: "No job card found.",
    //   });
    // }

    res.status(200).json(jobCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const jobCard = await AddToJobCard.findOne({ _id: id });
    res.status(200).json(jobCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteJobCard = async (req, res) => {
  try {
    const id = req.params.id;
    const jobCard = await AddToJobCard.deleteOne({ _id: id });
    res.status(200).json({ message: "Job card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
