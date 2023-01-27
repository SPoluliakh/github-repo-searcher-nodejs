const { Library } = require("../../models/library");

const add = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  console.log(body);
  const addedLibrary = await Library.create({ ...body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: addedLibrary,
    },
  });
};

module.exports = add;
