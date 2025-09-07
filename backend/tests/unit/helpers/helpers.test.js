import { success } from "../../../helpers/response.js"

test("success wraps data with status", () => {
  const out = success({ a: 1 }, 201)
  expect(out).toEqual({ status: 201, data: { a: 1 } })
})
