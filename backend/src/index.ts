import express from "express";
import dotenv from "dotenv";

// Routers
import userRouter from "./routes/user.route.ts";

const app = express();
dotenv.config();

const PORT = process.env.PORT! ?? 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
