import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import webpush from "web-push";

webpush.setVapidDetails(
    process.env.MAIL_TO,
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY,
);

export class NotificationsController {
    // POST /subscribe
    async subscribeToNotification(req: Request, res: Response) {
        console.log("Start subscription...");

        const { subscription, user } = req.body;
        if (!subscription) {
            return res.status(400).json({ error: "Invalid subscription" });
        }
        console.log("Subscribing user", user);

        const { endpoint, keys } = subscription;

        await prisma.pushSubscription.upsert({
            where: { user },
            update: {},
            create: {
                endpoint,
                p256dh: keys.p256dh,
                auth: keys.auth,
                user,
            },
        });

        res.status(201).json({ user: user });
        console.log(`Subscription of ${user} saved`);
    }

    // POST /sendSingleNotification
    async sendSingleNotification(req: Request, res: Response) {
        console.log("Start sending notif...");

        const { user } = req.body;

        if (!user || typeof user !== "string") {
            console.error("Invalid user");
            return res.status(400).json({ error: "Invalid user" });
        }

        const userSub = await prisma.pushSubscription.findFirst({
            where: { user },
        });

        if (!userSub) {
            console.error("No subscription found");
            return res.status(404).json({ error: "No subscription found" });
        }

        const payload = {
            title: `Hello ${user} 👋`,
            body: "Ceci est une notif de test 🎉",
            icon: "https://prochain-projet.vercel.app/icon-192x192.png",
            badge: "https://prochain-projet.vercel.app/15.png",
        };

        const subscription = {
            endpoint: userSub.endpoint,
            keys: {
                p256dh: userSub.p256dh,
                auth: userSub.auth,
            },
        };

        try {
            await webpush.sendNotification(
                subscription,
                JSON.stringify(payload),
            );
            console.log(`Notification sent to ${user}`);
            return res.status(200).json({ success: true });
        } catch (error: any) {
            if (error.statusCode === 410 || error.statusCode === 404) {
                await prisma.pushSubscription.delete({
                    where: { endpoint: userSub.endpoint },
                });
                console.log("Expired subscription removed:", userSub.endpoint);
                return res
                    .status(error.statusCode)
                    .json({ success: false, reason: "Subscription expired" });
            }

            console.error("Error sending push notification:", error);
            return res
                .status(500)
                .json({ error: "Failed to send notification" });
        }
    }

    // POST /sendCommonNotification
    async sendCommonNotification(_req: Request, res: Response) {
        console.log("Start sending notif...");

        const payload = JSON.stringify({
            title: "Hello 👋",
            body: "Ceci est une notif de test 🎉",
            icon: "https://prochain-projet.vercel.app/icon-192x192.png",
            badge: "https://prochain-projet.vercel.app/15.png",
        });

        const subscriptions = await prisma.pushSubscription.findMany();

        for (const sub of subscriptions) {
            const subscription = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth,
                },
                user: sub.user,
            };

            try {
                await webpush.sendNotification(subscription, payload);
                console.log("Push notif sent to:", subscription);
            } catch (error: any) {
                if (error.statusCode === 410 || error.statusCode === 404) {
                    // Subscription expired or deleted → remove from table
                    await prisma.pushSubscription.delete({
                        where: { endpoint: sub.endpoint },
                    });
                    console.log("Subscription expired removed:", sub.endpoint);
                } else {
                    console.error("Error sending push notification:", error);
                }
            }
        }

        res.json({ payload: payload });
        console.log("Notifications sent");
    }
}
