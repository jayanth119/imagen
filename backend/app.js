import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import geminiRouter from "./routes/geminiImageGenerator.js"; // ← new
import cloudinaryRoute from "./routes/imageprompt.js";

const app = express();

// view engine setup
app.set("views", path.join(path.dirname(new URL(import.meta.url).pathname), "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/gemini", geminiRouter); 
app.use("/api/cloudinary", cloudinaryRoute);   

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use((err, req, res, next) => {
//   const status = err.status || 500;

//   res.status(status).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// });


export default app;
