import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import { NotificationsRoutes } from "./routes/notifications.routes";

const app: Application = express();
app.use(
    cors({
        origin: [
            "https://www.morgane-et-arthur.fr",
            "https://prochain-projet.vercel.app",
            "http://localhost:5173",
        ],
    }),
);

app.use(express.json());

NotificationsRoutes.forEach((route) => {
    (app as any)[route.method](
        route.route,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                const controller = new route.controller();
                const result = await controller[route.action](req, res);
                return result;
            } catch (error) {
                next(error);
            }
        },
    );
});

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("SaveTheDate API working ✅");
});

export default app;
