import express from "express";
import dotenv from "dotenv"


const app = express();
dotenv.config();

const PORT = process.env.PORT! ?? 8080;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});