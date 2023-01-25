const express = require("express");

const { contactsControllers: cntr } = require("../../controllers");
const { validation, isValidId, auth } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const { joiSchema, joiSchemaFavorite } = require("../../models/contact");

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
  "/:id/favorite",
  auth,
  validation(joiSchemaFavorite),
  cntrlWrap(cntr.updateFavorite)
);

module.exports = libraryRouter;
