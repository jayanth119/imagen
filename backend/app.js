import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import geminiRouter from "./routes/geminiImageGenerator.js";
import cloudinaryRoute from "./routes/imageprompt.js";
import authRoute from "./routes/authRoute.js";
import QdrantRoute from "./routes/getImgQdrant.js";
import cors from "cors";

const app = express();

// view engine setup
app.set("views", path.join(path.dirname(new URL(import.meta.url).pathname), "views"));
app.set("view engine", "jade");

// CORS configuration - this must come BEFORE other middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Handle preflight requests
app.options('*', cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), "public")));

// Routes
app.use("/api/gemini", geminiRouter);
app.use("/api/cloudinary", cloudinaryRoute);
app.use("/api/auth", authRoute);
app.use("/api/qdrant", QdrantRoute);

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export default app;