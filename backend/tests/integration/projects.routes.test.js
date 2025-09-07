import { jest } from "@jest/globals"
import request from "supertest"
import express from "express"

await jest.unstable_mockModule(
  "../../middleware/authoriseRouteAccess.js",
  () => ({
    authoriseRouteAccess: (req, res, next) => next(),
  })
)
await jest.unstable_mockModule("../../middleware/authoriseObjectId.js", () => ({
  authoriseObjectId: (req, res, next) => next(),
}))
await jest.unstable_mockModule(
  "../../controllers/project.controller.js",
  () => ({
    createProject: (req, res) =>
      res.status(201).json({
        _id: "p1",
        title: req.body.title || "T",
        summary: "",
        status: "pending",
        sources: [],
      }),
    deleteProject: (req, res) => res.status(204).send(),
    getAllProjects: (req, res) => res.json([{ _id: "p1" }]),
    getProject: (req, res) =>
      res.json({
        _id: req.params.id,
        title: "T",
        description: "D",
        status: "pending",
        sources: [],
      }),
    getUserProjectStats: (req, res) => res.json({ total: 1 }),
  })
)
await jest.unstable_mockModule(
  "../../controllers/projectInjest.controller.js",
  () => ({
    getProjectState: (req, res) => res.json({ state: "processing" }),
    ingestionCallback: (req, res) => res.status(204).send(),
  })
)
await jest.unstable_mockModule(
  "../../controllers/google.controller.js",
  () => ({
    uploadFileForProject: (req, res) =>
      res.status(201).json({ ok: true, driveFile: { id: "fake-id" } }),
  })
)

const projectsRouter = (await import("../../routes/projects.route.js")).default

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use("/projects", projectsRouter)
  return app
}

const app = makeApp()

describe("Projects routes", () => {
  test("GET /projects returns list", async () => {
    const r = await request(app).get("/projects")
    expect(r.status).toBe(200)
    expect(Array.isArray(r.body)).toBe(true)
  })

  test("POST /projects creates", async () => {
    const r = await request(app).post("/projects").send({ title: "DocFlow" })
    expect(r.status).toBe(201)
    expect(r.body._id).toBe("p1")
  })

  test("GET /projects/:id returns project", async () => {
    const r = await request(app).get("/projects/64f000000000000000000000")
    expect(r.status).toBe(200)
    expect(r.body._id).toBe("64f000000000000000000000")
  })

  test("POST /projects/:id/upload calls upload", async () => {
    const r = await request(app)
      .post("/projects/64f000000000000000000000/upload")
      .attach("file", Buffer.from("x"), {
        filename: "a.pdf",
        contentType: "application/pdf",
      })
    expect(r.status).toBe(201)
    expect(r.body.ok).toBe(true)
  })

  test("GET /projects/:id/state returns state", async () => {
    const r = await request(app).get("/projects/64f000000000000000000000/state")
    expect(r.status).toBe(200)
    expect(r.body.state).toBe("processing")
  })

  test("GET /projects/stats returns stats", async () => {
    const r = await request(app).get("/projects/stats")
    expect(r.status).toBe(200)
    expect(r.body.total).toBe(1)
  })

  test("DELETE /projects/:id deletes", async () => {
    const r = await request(app).delete("/projects/64f000000000000000000000")
    expect(r.status).toBe(204)
  })
})
