import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { connetDB } from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

connetDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Listen to the port
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
