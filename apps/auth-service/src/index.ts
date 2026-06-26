import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/authMiddleware";
import router from "./routes/route";
import { producer } from "./utils/kafka";


const app = express();

app.use(cors({
  origin: ["http://localhost:3003"],
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
    await producer.connect();
    app.listen(8003, () => {
      console.log("Auth service is running on 8000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start()