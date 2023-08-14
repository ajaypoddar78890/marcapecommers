import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRout from "./routes/authRout.js";
import categoryRout from "./routes/categoryRout.js";
import productRout from "./routes/productRout.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRout);
app.use("/api/v1/category", categoryRout);
app.use("/api/v1/product", productRout);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//port
const PORT = process.env.PORT || 5500;
//listing the app

app.listen(PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
