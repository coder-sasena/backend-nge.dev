import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname
import connectDB from "./config/db.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
connectDB();

// Gunakan fileURLToPath untuk mendapatkan path dari __filename
const __filename = fileURLToPath(import.meta.url);
// Gunakan dirname untuk mendapatkan direktori dari __filename
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running....");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
