const { Library } = require("../../models/library");

const updateComents = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { _id } = req.user;
  const repoToUpdate = await Library.findOneAndUpdate(
    { _id: id, owner: _id },
    body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!repoToUpdate) {
    const error = new Error(`repo whith id = ${id} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: repoToUpdate,
    },
  });
};

module.exports = updateComents;
