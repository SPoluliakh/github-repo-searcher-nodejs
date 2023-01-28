const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleDbSchemaError } = require("../helpers");

const libraryDbSchema = Schema(
  {
    html_url: {
      type: String,
      required: [true, "Set html_url "],
      default: "",
    },
    full_name: {
      type: String,
      required: [true, "Set full_name "],
      default: "",
    },
    forks: {
      type: Number,
      required: [true, "Set forks "],
      default: "",
    },
    watchers: {
      type: Number,
      required: [true, "Set watchers "],
      default: "",
    },
    description: {
      type: String,
      required: [true, "Set description "],
      default: "",
    },
    updated_at: {
      type: String,
      required: [true, "Set updated_at "],
      default: "",
    },

    coments: { type: String, default: "" },

    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

libraryDbSchema.post("save", handleDbSchemaError);

const Library = model("library", libraryDbSchema);

const joiSchema = Joi.object({
  html_url: Joi.string().required(),
  full_name: Joi.string().required(),
  forks: Joi.number().required(),
  description: Joi.string().required(),
  updated_at: Joi.string().required(),
  watchers: Joi.number().required(),
  coments: Joi.string(),
  favorite: Joi.boolean(),
});

const joiSchemaComents = Joi.object({
  coments: Joi.string().required(),
});

module.exports = {
  Library,
  joiSchema,
  joiSchemaComents,
};
