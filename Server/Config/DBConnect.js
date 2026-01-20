import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database connected"));
    mongoose.connection.on("error", (err) =>
      console.log(`Database connection error: ${err}`)
    );

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in .env");
    }

    // ✅ Modern Mongoose does NOT need useNewUrlParser or useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN", // optional
    });

    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
