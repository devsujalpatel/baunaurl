import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routers
import userRouter from "./routes/user.route.ts";
import urlRoutes from "./routes/url.routes.ts";

const app = express();
dotenv.config();

const PORT = process.env.PORT! ?? 8080;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome To URL SHORTNER");
});

app.use("/api/user", userRouter);
app.use(urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
