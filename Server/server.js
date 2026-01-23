import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./Routes/route.js";
import connectDB from "./Config/DBConnect.js";



if (!process.env.MONGO_URI) {
  throw new Error("MONGODB_URI environment variable is required");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

connectDB();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
