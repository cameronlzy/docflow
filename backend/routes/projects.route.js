import express from "express"
import multer from "multer"
import { authoriseObjectId } from "../middleware/authoriseObjectId.js"
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getUserProjectStats,
} from "../controllers/project.controller.js"
import { authoriseRouteAccess } from "../middleware/authoriseRouteAccess.js"
import {
  getProjectState,
  ingestionCallback,
} from "../controllers/projectInjest.controller.js"
import { uploadFileForProject } from "../controllers/google.controller.js"

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } })

const router = express.Router()

router.param("id", authoriseObjectId)

router.patch("/ingest/callback/:uploadToken", ingestionCallback)
router.use(authoriseRouteAccess)
router.route("/stats").get(getUserProjectStats)
router.route("/").get(getAllProjects).post(createProject)
router.post("/:id/upload", upload.single("file"), uploadFileForProject)

router.get("/:id/state", getProjectState)

router.route("/:id").get(getProject).delete(deleteProject)

export default router
