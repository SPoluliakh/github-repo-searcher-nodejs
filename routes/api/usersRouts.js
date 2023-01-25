const express = require("express");

const { users: cntr } = require("../../controllers");
const { auth, upload } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.post("/current", auth, cntrlWrap(cntr.currentUser));

usersRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  cntrlWrap(cntr.updateAvatar)
);

module.exports = usersRouter;
