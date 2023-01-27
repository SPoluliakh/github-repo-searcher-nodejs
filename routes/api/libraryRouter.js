const express = require("express");

const { contactsControllers: cntr } = require("../../controllers");
const { validation, isValidId, auth } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const { joiSchema, joiSchemaComents } = require("../../models/library");

const libraryRouter = express.Router();

libraryRouter.get("/", auth, cntrlWrap(cntr.getAll));

libraryRouter.get("/:id", auth, isValidId, cntrlWrap(cntr.getById));

libraryRouter.post("/", auth, validation(joiSchema), cntrlWrap(cntr.add));

libraryRouter.delete("/:id", auth, isValidId, cntrlWrap(cntr.remove));

libraryRouter.put(
  "/:id",
  auth,
  isValidId,
  validation(joiSchema),
  cntrlWrap(cntr.update)
);

libraryRouter.patch(
  "/:id/coments",
  auth,
  validation(joiSchemaComents),
  cntrlWrap(cntr.updateComents)
);

module.exports = libraryRouter;
