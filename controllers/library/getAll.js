const { Library } = require("../../models/library");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const allRepos = await Library.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allRepos,
    },
  });
};

module.exports = getAll;
