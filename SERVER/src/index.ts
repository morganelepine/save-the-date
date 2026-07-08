import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { AIController } from "./controllers/ai.controller";

const app: Application = express();

const allowedOrigins = new Set([
    "http://localhost:5174",
    "https://save-the-daaate.vercel.app",
]);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }

            callback(null, false);
        },
    }),
);

app.use(express.json());

const aiController = new AIController();

app.post("/ai/hint", (req, res, next) => {
    aiController.getHint(req, res).catch(next);
});

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("save-the-date API working ✅");
});

app.use(
    (
        error: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error("Unhandled server error:", error);
        res.status(500).json({ error: "Internal server error" });
    },
);

export default app;
