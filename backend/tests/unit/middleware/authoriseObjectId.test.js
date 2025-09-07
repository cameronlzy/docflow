import { jest } from "@jest/globals"
const { authoriseObjectId } = await import(
  "../../../middleware/authoriseObjectId.js"
)

test("authoriseObjectId returns 400 for invalid id", () => {
  const req = {}
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()
  authoriseObjectId(req, res, next, "not-an-objectid")
  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.json).toHaveBeenCalledWith({
    status: "fail",
    message: "Invalid ID format",
  })
  expect(next).not.toHaveBeenCalled()
})
