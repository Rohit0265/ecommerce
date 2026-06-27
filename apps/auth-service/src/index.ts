import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/authMiddleware";
import router from "./routes/route";
import { producer } from "./utils/kafka";


const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map(o => o.trim())
  : [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
}));
app.use(express.json());
app.use(clerkMiddleware());




app.use("/users",shouldBeAdmin,router);

// app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Inter Server Error!" });
});

const start = async () => {
  try {
    producer.connect().catch((error) => {
      console.error("Failed to connect auth-service Kafka producer:", error);
    });
    app.listen(8003, () => {
      console.log("Auth service is running on 8000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start()