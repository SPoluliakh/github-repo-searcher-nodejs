const express = require("express");

const { users: cntr } = require("../../controllers");
const { auth } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.get("/current", auth, cntrlWrap(cntr.currentUser));

module.exports = usersRouter;
