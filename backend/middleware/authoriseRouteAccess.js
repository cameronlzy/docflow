import { promisify } from "util"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"
import User from "../models/user.model.js"

export function makeAuthoriseRouteAccess({ verifyJwt, findUserById }) {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies?.jwt
    if (!token)
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      )

    const decoded = await verifyJwt(token, process.env.JWT_SECRET)

    const currentUser = await findUserById(decoded.id)
    if (!currentUser)
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      )

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      )
    }

    req.user = currentUser
    next()
  })
}

export const authoriseRouteAccess = makeAuthoriseRouteAccess({
  verifyJwt: (t, s) => promisify(jwt.verify)(t, s),
  findUserById: (id) => User.findById(id),
})
