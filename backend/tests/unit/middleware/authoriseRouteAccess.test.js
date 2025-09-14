import { jest } from "@jest/globals"
import { makeAuthoriseRouteAccess } from "../../../middleware/authoriseRouteAccess.js"

const runMw = (mw, req = {}, res = {}) =>
  new Promise((resolve) => mw(req, res, (err) => resolve({ err, req, res })))

test("sets req.user and calls next", async () => {
  process.env.JWT_SECRET = "test"
  const verifyJwt = jest.fn().mockResolvedValue({ id: "u1", iat: 123 })
  const user = { changedPasswordAfter: () => false, isVerified: true }
  const findUserById = jest.fn().mockResolvedValue(user)
  const mw = makeAuthoriseRouteAccess({ verifyJwt, findUserById })

  const req = { cookies: { jwt: "token" } }
  const res = {}
  const { err, req: outReq } = await runMw(mw, req, res)
  expect(err).toBeUndefined()
  expect(verifyJwt).toHaveBeenCalledWith("token", "test")
  expect(findUserById).toHaveBeenCalledWith("u1")
  expect(outReq.user).toBe(user)
})

test("401 when no token", async () => {
  const mw = makeAuthoriseRouteAccess({
    verifyJwt: jest.fn(),
    findUserById: jest.fn(),
  })
  const req = { cookies: {} }
  const res = {}
  const { err } = await runMw(mw, req, res)

  expect(err.statusCode || err.status).toBe(401)
})

test("401 when user not found", async () => {
  const mw = makeAuthoriseRouteAccess({
    verifyJwt: jest.fn().mockResolvedValue({ id: "u1", iat: 1 }),
    findUserById: jest.fn().mockResolvedValue(null),
  })
  const req = { cookies: { jwt: "t" } }
  const res = {}
  const { err } = await runMw(mw, req, res)
  expect(err.statusCode || err.status).toBe(401)
})
