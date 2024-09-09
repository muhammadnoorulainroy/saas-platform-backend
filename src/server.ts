import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
