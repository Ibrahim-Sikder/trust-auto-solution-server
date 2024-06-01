const ShowRoom = require("../../Models/ShowRoom");

const findLastShowRoomId = async () => {
  const lastShowRoom = await ShowRoom.findOne(
    {},
    {
      showRoomId: 1,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastShowRoom?.showRoomId
    ? lastShowRoom?.showRoomId.substring(6)
    : undefined;
};

exports.generateShowRoomId = async () => {
  const currentId = (await findLastShowRoomId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `TAS:03${incrementId}`;
  return incrementId;
};
