import Joi from "joi"

const roles = ["user", "guide", "lead-guide", "admin"]

export const validateUser = (user) => {
  const createUserSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name must have at most 100 characters",
      "any.required": "A user must have a name",
    }),
    email: Joi.string().trim().lowercase().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
      "any.required": "A user must have an email",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "any.required": "A user must have a password",
    }),
    passwordConfirm: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "Please confirm your password",
      }),
  }).required()
  return createUserSchema.validate(user)
}

export const validateUserPatch = (user) => {
  const updateUserSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).messages({
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name must have at most 100 characters",
    }),
    email: Joi.string().trim().lowercase().email().messages({
      "string.email": "Please provide a valid email",
    }),
    password: Joi.string().min(8).messages({
      "string.min": "Password must be at least 8 characters",
    }),
    passwordConfirm: Joi.string().valid(Joi.ref("password")).messages({
      "any.only": "Passwords do not match",
    }),
  }).min(1)

  return updateUserSchema.validate(user)
}

export const validateLogin = (loginUser) => {
  const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().empty("").min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "any.required": "Password is required",
    }),
  }).required()
  return loginSchema.validate(loginUser)
}
