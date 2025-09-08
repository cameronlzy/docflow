import mongoose from "mongoose"
import { unhandledError } from "./utils/unhandledError.js"

process.on("uncaughtException", (err) => {
  unhandledError(err, "UNCAUGHT EXCEPTION!")
})
if (process.env.NODE_ENV !== "production") {
  const { default: dotenv } = await import("dotenv")
  dotenv.config({ path: "./config.env" })
}

const { default: app } = await import("./app.js")

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)
mongoose.connect(DB).then(() => console.log("DB Connection Successful"))

const port = process.env.PORT || 8080
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App running on Port ${port}...`)
})

process.on("unhandledRejection", (err) => {
  unhandledError(err, "UNHANDLED REJECTION!", server)
})
