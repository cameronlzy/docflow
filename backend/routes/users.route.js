import express from "express"
import { authoriseObjectId } from "../middleware/authoriseObjectId.js"
import {
  login,
  logout,
  sendVerification,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js"
import {
  getUser,
  updateUser,
  getCurrentUser,
} from "../controllers/user.controller.js"
import { authoriseRouteAccess } from "../middleware/authoriseRouteAccess.js"
import { deleteProject } from "../controllers/project.controller.js"

const router = express.Router()

router.param("id", authoriseObjectId)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/send-email", sendVerification)
router.post("/verify-email/:token", verifyEmail)
router.route("/me").get(authoriseRouteAccess, getCurrentUser)
router
  .route("/:id")
  .get(getUser)
  .patch(authoriseRouteAccess, updateUser)
  .delete(deleteProject)

export default router
