import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { NotificationsController } from "./controllers/notifications.controllers";

const app: Application = express();

const allowedOrigins = new Set([
    "http://localhost:5174",
    "https://save-the-daaate.vercel.app/",
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

const notificationsController = new NotificationsController();

app.post("/notifications/subscribe", (req, res, next) => {
    notificationsController.subscribeToNotification(req, res).catch(next);
});

app.post("/notifications/sendSingleNotification", (req, res, next) => {
    notificationsController.sendSingleNotification(req, res).catch(next);
});

app.post("/notifications/sendCommonNotification", (req, res, next) => {
    notificationsController.sendCommonNotification(req, res).catch(next);
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
