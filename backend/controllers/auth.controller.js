import { success } from "../helpers/response.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/user.model.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import {
  validateEmail,
  validateLogin,
  validateUser,
} from "../validators/user.validator.js"
import { COOKIESETTING } from "../constants/cookieSetting.js"
import { sendEmail } from "../utils/email.js"
import { verificationHtmlBuilder } from "../utils/htmlBuilder.js"

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  })
}

const tokenAndResponse = (res, user) => {
  const token = signToken(user._id)
  res.cookie("jwt", token, COOKIESETTING)
  res.status(201).json(success({ user }, 201))
}

export const signup = catchAsync(async (req, res, next) => {
  const { error: validationError, value } = validateUser(req.body)
  if (validationError) {
    return next(new AppError(validationError.details[0].message, 400))
  }
  const nonRegisteredValue = { ...value, isVerified: false }
  const newUser = await User.create(nonRegisteredValue)
  const userSafe = newUser.toObject()
  delete userSafe.password

  tokenAndResponse(res, userSafe)
})

export const login = catchAsync(async (req, res, next) => {
  // Check if email and password valid
  const { error: validationError, value } = validateLogin(req.body)
  if (validationError) {
    return next(new AppError(validationError.details[0].message, 400))
  }

  // Check if user and password is correct
  const user = await User.findOne({ email: value.email }).select("+password")
  const correct =
    user && (await user.correctPassword(req.body.password, user.password))

  if (!correct) {
    return next(new AppError("Incorrect email or password", 401))
  }
  // If everything ok, can send token to client
  const userSafe = user.toObject()
  delete userSafe.password
  tokenAndResponse(res, userSafe)
})

export const logout = catchAsync(async (req, res, next) => {
  // Set cookie with immediate expiry
  res.clearCookie("jwt", COOKIESETTING)
  res.status(200).json(success({ message: "Logged out successfully" }, 200))
})

export const sendVerification = catchAsync(async (req, res, next) => {
  const { error: validationError, value } = validateEmail(req.body)
  if (validationError) {
    console.log(validationError)
    return next(new AppError(validationError.details[0].message, 400))
  }
  const user = await User.findOne({ email: value.email })
  if (!user) {
    return next(new AppError("User not found", 400))
  }

  if (user.isVerified) {
    return next(new AppError("Email is already verified"))
  }

  const token = crypto.randomBytes(32).toString("hex")
  const hash = crypto.createHash("sha256").update(token).digest("hex")

  user.verifyEmailToken = hash
  user.verifyEmailExpires = Date.now() + 30 * 60 * 1000
  await user.save({ validateBeforeSave: false })

  const link = `${process.env.CORS_ORIGIN}/verify-email?token=${token}`
  await sendEmail({
    email: user.email,
    subject: "Verify your DocFlow Account",
    message: `Here is your account verification link: ${link} \nClick on the link to verify your account`,
    html: verificationHtmlBuilder(link),
  })

  res.status(201).json(success({ message: "Email successfully sent" }, 201))
})

export const verifyEmail = catchAsync(async (req, res, next) => {
  const hash = crypto
    .createHash("sha256")
    .update(req.params?.token)
    .digest("hex")

  const user = await User.findOne({
    verifyEmailToken: hash,
    verifyEmailExpires: { $gt: Date.now() },
  })

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400))
  }

  user.isVerified = true
  user.verifyEmailExpires = undefined
  user.verifyEmailToken = undefined
  await user.save({ validateBeforeSave: false })

  tokenAndResponse(res, user)
})
