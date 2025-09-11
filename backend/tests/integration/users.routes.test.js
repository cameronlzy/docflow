import { jest } from "@jest/globals"
import request from "supertest"
import express from "express"

await jest.unstable_mockModule("../../middleware/authoriseObjectId.js", () => ({
  authoriseObjectId: (req, res, next) => next(),
}))
await jest.unstable_mockModule(
  "../../middleware/authoriseRouteAccess.js",
  () => ({
    authoriseRouteAccess: (req, res, next) => next(),
  })
)
await jest.unstable_mockModule("../../controllers/auth.controller.js", () => ({
  signup: (req, res) => res.status(201).json({ userId: "u1" }),
  login: (req, res) => res.json({ token: "t" }),
  logout: (req, res) => res.status(204).send(),
  sendVerification: (req, res) => res.status(201).json({ message: "sent" }),
  verifyEmail: (req, res) => res.status(200).json({ ok: true }),
}))
await jest.unstable_mockModule("../../controllers/user.controller.js", () => ({
  getUser: (req, res) => res.json({ _id: req.params.id }),
  updateUser: (req, res) => res.json({ ok: true }),
  getCurrentUser: (req, res) => res.json({ _id: "me" }),
}))
await jest.unstable_mockModule(
  "../../controllers/project.controller.js",
  () => ({
    deleteProject: (req, res) => res.status(204).send(),
  })
)

const usersRouter = (await import("../../routes/users.route.js")).default

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use("/users", usersRouter)
  return app
}

const app = makeApp()

describe("Users routes", () => {
  test("POST /users/signup", async () => {
    const r = await request(app)
      .post("/users/signup")
      .send({ email: "a@b.com", password: "x" })
    expect(r.status).toBe(201)
    expect(r.body.userId).toBe("u1")
  })

  test("POST /users/login", async () => {
    const r = await request(app)
      .post("/users/login")
      .send({ email: "a@b.com", password: "x" })
    expect(r.status).toBe(200)
    expect(r.body.token).toBe("t")
  })

  test("POST /users/logout", async () => {
    const r = await request(app).post("/users/logout")
    expect(r.status).toBe(204)
  })

  test("GET /users/me", async () => {
    const r = await request(app).get("/users/me")
    expect(r.status).toBe(200)
    expect(r.body._id).toBe("me")
  })

  test("GET /users/:id", async () => {
    const r = await request(app).get("/users/64f000000000000000000000")
    expect(r.status).toBe(200)
    expect(r.body._id).toBe("64f000000000000000000000")
  })

  test("PATCH /users/:id", async () => {
    const r = await request(app)
      .patch("/users/64f000000000000000000000")
      .send({ name: "n" })
    expect(r.status).toBe(200)
    expect(r.body.ok).toBe(true)
  })

  test("DELETE /users/:id", async () => {
    const r = await request(app).delete("/users/64f000000000000000000000")
    expect(r.status).toBe(204)
  })
})
