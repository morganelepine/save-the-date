import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

const subscription: webpush.PushSubscription = {
    endpoint:
        "https://fcm.googleapis.com/fcm/send/fj2Q_Q_4AUU:APA91bEPnXcvrtYcAvzkwxv8TslQ1qUAC_PjQRbssGvgInpe16JSGznv3JtxNX_AZWCQfD9YZMl27T7ETIo7dvbtYuX2KSI9FqhZ3Qp8lBJc5uHRy28jXD3Eho6GFoSfX7i9rI2T9PsT",
    expirationTime: null,
    keys: {
        p256dh: "BDwRoOUsFUNcD7ZmpKsKbBHBXVscj0ZZJ6mk2Y1czcXN_hsp2LcwdEsMRU1iSC0EdwBXRWF6yroLQZp_FC-THJA",
        auth: "UJzrEIiQDylPlegpdwNSvA",
    },
};

const payload = JSON.stringify({
    title: "Test",
    body: "Notif test 🚀",
    icon: "https://example.com/icon.png",
});

const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
    process.env.MAIL_TO,
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

webpush
    .sendNotification(subscription, payload)
    .then(() => console.log("Notification envoyée !"))
    .catch((error) => console.error("Error sending push notification:", error));

// npx ts-node/esm src/sendTestNotif.ts
