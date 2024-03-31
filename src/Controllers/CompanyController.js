const Company = require("../Models/Company");

exports.createCompanyDetails = async (req, res) => {
  try {
    const companyCreated = new Company(req.body);
    const result = await companyCreated.save();
    res.status(200).json({
      message: "Successfully add to company post",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};



exports.getCompanyData = async (req, res) => {
  try {
    const allPost = await Company.find({}).sort({
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
   

    const isNumeric = !isNaN(Number(filterType));
    const filterValue = isNumeric ? Number(filterType) : filterType;

    let company;

    if (!isNumeric) {
      // Case-insensitive partial string matching for string fields
      company = await Company.find({
        $or: [
          { Company_name: { $regex: filterType, $options: "i" } },
          { date: { $regex: filterType, $options: "i" } },
          { car_registration_no: { $regex: filterType, $options: "i" } },
        ].filter(Boolean),
      });
    } else {
      // Exact match for numeric fields
      company = await Company.find({
        $or: [
          { job_no: filterValue },
          { Company_contact: filterValue },
        ],
      });
    }

    if (!company || company.length === 0) {
      return res.json({ message: "No matching found", result: [] });
    }

    res.json({ message: "Filter successful", result: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 

// exports.getRecentPostAddToJobCard = async (req, res) => {
//   try {
//     const recentPostJobCard = await Company.find({})
//       .sort({ createdAt: -1 })
//       .limit(1);

//     if (recentPostJobCard.length === 0) {
//       return res.json({
//         message: "No recent job card found.",
//       });
//     }

//     res.json(recentPostJobCard[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// exports.getRecentAddToJobCard = async (req, res) => {
//   try {
//     const recentJobCard = await Company.find({})
//       .sort({ job_no: -1 })
//       .limit(1);

//     if (recentJobCard.length === 0) {
//       return res.json({
//         message: "No recent job card found.",
//       });
//     }

//     res.json(recentJobCard[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getCompanyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findOne({ companyId: id });
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.getPreviewJobNoCard = async (req, res) => {
//   try {
//     const job_no = req.params.job_no;
//     const jobCard = await Company.findOne({job_no });
  
//     // if (jobCard.length === 0) {
//     //   return res.json({
//     //     message: "No job card found.",
//     //   });
//     // }

//     res.status(200).json(jobCard);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getSpecificCard = async (req, res) => {
  try {
    const id = req.params.id;
 
    const company = await Company.findOne({ _id: id });
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = req.body;
    const updateInfo = await Company.updateMany(
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
exports.deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.deleteOne({ _id: id });
    res.status(200).json({ message: "Company card delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
