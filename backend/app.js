import express from "express"
import morgan from "morgan"
import userRouter from "./routes/users.route.js"
import projectRouter from "./routes/projects.route.js"
import AppError from "./utils/appError.js"
import globalErrorHandler from "./controllers/error.controller.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit"
import { deepClean } from "./helpers/deepClean.js"
import { sseHandler } from "./services/sse.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

// 1) Middleware
const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
// if you need cookies (axios.withCredentials = true), you must use a specific origin and allow credentials
app.use(cors(corsConfig))
// handle preflight explicitly (optional but safe)
app.options(/.*/, cors(corsConfig))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")) // Logger
}

// Limit requests from same API
app.set("trust proxy", 1)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(["/users", "/projects"], limiter)

app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// Data sanitisation against NoSQL query injection
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body)
  if (req.params) req.params = mongoSanitize.sanitize(req.params)
  if (req.headers) req.headers = mongoSanitize.sanitize(req.headers)
  // Don't touch req.query (getter-only in Express 5)
  next()
})

// XSS sanitisation
app.use((req, res, next) => {
  if (req.body) req.body = deepClean(req.body)
  if (req.params) req.params = deepClean(req.params)
  // avoid rewriting req.query in Express 5
  next()
})

app.use(express.static(`${__dirname}/public`))
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "HELLO FROM SERVER",
//     app: "Natours",
//   });
// });

//2) Route Handlers

// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour); // btr than put as more lightweight
// app.delete("/api/v1/tours/:id", deleteTour);

// 3) Routes
app.get("/events", (req, res) => {
  sseHandler(req, res)
})

app.use("/users", userRouter)
app.use("/projects", projectRouter)
app.get("/health", (req, res) => res.status(200).json({ ok: true }))
app.use(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
