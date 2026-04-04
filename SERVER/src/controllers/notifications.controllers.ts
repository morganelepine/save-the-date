import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import webpush from "web-push";

webpush.setVapidDetails(
    process.env.MAIL_TO ?? "",
    process.env.PUBLIC_VAPID_KEY ?? "",
    process.env.PRIVATE_VAPID_KEY ?? "",
);

type PushSubscriptionPayload = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};

const isPushSubscriptionPayload = (
    value: unknown,
): value is PushSubscriptionPayload => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const maybeSubscription = value as Partial<PushSubscriptionPayload>;
    return (
        typeof maybeSubscription.endpoint === "string" &&
        Boolean(maybeSubscription.endpoint) &&
        typeof maybeSubscription.keys?.p256dh === "string" &&
        Boolean(maybeSubscription.keys.p256dh) &&
        typeof maybeSubscription.keys?.auth === "string" &&
        Boolean(maybeSubscription.keys.auth)
    );
};

const buildSubscription = (subscription: PushSubscriptionPayload) => {
    return {
        endpoint: subscription.endpoint,
        keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
        },
    };
};

const isGoneSubscriptionError = (error: unknown) => {
    if (!error || typeof error !== "object") {
        return false;
    }

    const statusCode = (error as { statusCode?: number }).statusCode;
    return statusCode === 410 || statusCode === 404;
};

export class NotificationsController {
    // POST /subscribe
    async subscribeToNotification(req: Request, res: Response) {
        const { subscription } = req.body;
        if (!isPushSubscriptionPayload(subscription)) {
            return res.status(400).json({ error: "Invalid subscription" });
        }

        await prisma.pushSubscription.upsert({
            where: { endpoint: subscription.endpoint },
            update: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            },
            create: {
                endpoint: subscription.endpoint,
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            },
        });

        return res.status(200).json({ success: true });
    }

    // POST /sendSingleNotification
    async sendSingleNotification(req: Request, res: Response) {
        const { subscription } = req.body;
        if (!isPushSubscriptionPayload(subscription)) {
            return res.status(400).json({ error: "Invalid subscription" });
        }

        const payload = {
            title: "Hello 👋",
            body: "Ceci est une notif de test 🎉",
            icon: "https://save-the-daaate.vercel.app/icon-192x192.png",
            badge: "https://save-the-daaate.vercel.app/15.png",
        };

        try {
            await webpush.sendNotification(
                buildSubscription(subscription),
                JSON.stringify(payload),
            );
            return res.status(200).json({ success: true });
        } catch (error) {
            if (isGoneSubscriptionError(error)) {
                await prisma.pushSubscription.delete({
                    where: { endpoint: subscription.endpoint },
                });
                return res
                    .status(410)
                    .json({ success: false, reason: "Subscription expired" });
            }
            return res
                .status(500)
                .json({ error: "Failed to send notification" });
        }
    }

    // POST /sendCommonNotification
    async sendCommonNotification(req: Request, res: Response) {
        const adminToken = process.env.NOTIFICATIONS_ADMIN_TOKEN;
        if (adminToken) {
            const providedToken = req.header("x-admin-token");
            if (providedToken !== adminToken) {
                return res.status(401).json({ error: "Unauthorized" });
            }
        }

        const payload = JSON.stringify({
            title: "Hello 👋",
            body: "Ceci est une notif de test 🎉",
            icon: "https://save-the-daaate.vercel.app/icon-192x192.png",
            badge: "https://save-the-daaate.vercel.app/15.png",
        });

        const subscriptions = await prisma.pushSubscription.findMany();

        for (const sub of subscriptions) {
            const subscription = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth,
                },
            };

            try {
                await webpush.sendNotification(subscription, payload);
            } catch (error) {
                if (isGoneSubscriptionError(error)) {
                    // Subscription expired or deleted → remove from table
                    await prisma.pushSubscription.delete({
                        where: { endpoint: sub.endpoint },
                    });
                }
            }
        }

        return res.json({ payload });
    }
}
