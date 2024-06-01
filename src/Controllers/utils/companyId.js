const Company = require("../../Models/Company");

const findLastCompanyId = async () => {
  const lastCompany = await Company.findOne(
    {},
    {
      companyId: 1,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastCompany?.companyId
    ? lastCompany?.companyId.substring(6)
    : undefined;
};

exports.generateCompanyId = async () => {
  const currentId = (await findLastCompanyId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `TAS:02${incrementId}`;
  return incrementId;
};
