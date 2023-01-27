const { Library } = require("../../models/library");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const repo = await Library.findOne(
    { _id: id, owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id name email");
  if (!repo) {
    const error = new Error(`repo whith id = ${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: repo,
    },
  });
};

module.exports = getById;
