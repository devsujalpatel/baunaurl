import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Routers
import userRouter from "./routes/user.route.ts";

const app = express();
dotenv.config();

const PORT = process.env.PORT! ?? 8080;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
