const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { handleDbSchemaError } = require("../helpers");

const userDbSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Emaul is required"],
      unique: [true, " Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    avatarURL: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userDbSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userDbSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userDbSchema.post("save", handleDbSchemaError);
userDbSchema.post("findOneAndUpdate", handleDbSchemaError);

const User = model("user", userDbSchema);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
