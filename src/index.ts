import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import userRouter from "./routes/user.route.js";
import urlRoutes from "./routes/url.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT! ?? 8080;

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true, 
    credentials: true, 
  })
);

app.get("/", (req, res) => {
  res.send("Welcome To URL SHORTNER");
});

app.use("/api/user", userRouter);
app.use(urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
