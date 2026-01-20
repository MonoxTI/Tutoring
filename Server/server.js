import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/routes.js";
import connectDB from "./Config/DBConnect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
