// validators.ts
import Joi, { ObjectSchema, ValidationResult } from "joi"

export const roles = ["user", "guide", "lead-guide", "admin"] as const
export type Role = (typeof roles)[number]

export interface UserCreate {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface UserUpdate {
  name?: string
  email?: string
  password?: string
  passwordConfirm?: string
}

export interface LoginInput {
  email: string
  password: string
}

export const createUserSchema: ObjectSchema<UserCreate> =
  Joi.object<UserCreate>({
    name: Joi.string().trim().min(3).max(100).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name must have at most 100 characters",
      "any.required": "A user must have a name",
    }),
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
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

export const updateUserSchema: ObjectSchema<UserUpdate> =
  Joi.object<UserUpdate>({
    name: Joi.string().trim().min(3).max(100).messages({
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name must have at most 100 characters",
    }),
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .messages({
        "string.email": "Please provide a valid email",
      }),
    password: Joi.string().min(8).messages({
      "string.min": "Password must be at least 8 characters",
    }),
    passwordConfirm: Joi.string().valid(Joi.ref("password")).messages({
      "any.only": "Passwords do not match",
    }),
  }).min(1)

export const loginSchema: ObjectSchema<LoginInput> = Joi.object<LoginInput>({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  // treat "" as missing and fail fast
  password: Joi.string().empty("").min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
}).required()

export const validateUser = (user: unknown): ValidationResult<UserCreate> =>
  createUserSchema.validate(user)

export const validateUserPatch = (
  user: unknown
): ValidationResult<UserUpdate> => updateUserSchema.validate(user)

export const validateLogin = (
  loginUser: unknown
): ValidationResult<LoginInput> => loginSchema.validate(loginUser)
