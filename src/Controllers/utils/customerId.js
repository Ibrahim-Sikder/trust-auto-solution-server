const Customer = require("../../Models/Customer");

const findLastCustomerId = async () => {
  const lastCustomer = await Customer.findOne(
    {},
    {
      customerId: 1,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastCustomer?.customerId
    ? lastCustomer?.customerId.substring(6)
    : undefined;
};

exports.generateCustomerId = async () => {
  const currentId = (await findLastCustomerId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `TAS:01${incrementId}`;
  return incrementId;
};
