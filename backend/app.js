import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import geminiRouter from "./routes/geminiImageGenerator.js"; // ← new
import cloudinaryRoute from "./routes/imageprompt.js";
import authRoute from "./routes/authRoute.js"; // ← new
import { ApolloServer } from 'apollo-server-express';
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import http from "http";
import cors from "cors";

const app = express();

// view engine setup
app.set("views", path.join(path.dirname(new URL(import.meta.url).pathname), "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), "public")));

app.use("/gemini", geminiRouter); 
app.use("/api/cloudinary", cloudinaryRoute); 
app.use("/api/auth", authRoute); 
app.use(cors({
  origin: "http://localhost:3000",  // or true
  credentials: true,
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
}));
app.options("*", cors());

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

await server.start();
server.applyMiddleware({ app, path: "/graphql", cors: false });

httpServer.listen({ port: 4000 }, () => {
  console.log(` Server ready at http://localhost:4000/graphql`);
});

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
