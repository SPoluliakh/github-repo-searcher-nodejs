const { Library } = require("../../models/library");

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const repoToDelete = await Library.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!repoToDelete) {
    const error = new Error(`repo whith id = ${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: repoToDelete,
    },
  });
};

module.exports = remove;
