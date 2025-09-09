import { success } from "../helpers/response.js"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import {
  validateEmailReq,
  validateLogin,
  validateUser,
} from "../validators/user.validator.js"
import { COOKIESETTING } from "../constants/cookieSetting.js"
import { sendEmail } from "../utils/email.js"

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
  const newUser = await User.create(value)
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

export const emailVerification = catchAsync(async (req, res, next) => {
  // Check if email valid
  const { error: validationError, value } = validateEmailReq(req.body)
  if (validationError) {
    return next(new AppError(validationError.details[0].message, 400))
  }

  const user = await User.findOne({ email: value.email })
  if (!user) {
    return next(new AppError("User does not exist"), 404)
  }

  const tempAuthToken = signToken(user._id + "temporary_auth")
  await sendEmail()

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    })

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    )
  }
})
