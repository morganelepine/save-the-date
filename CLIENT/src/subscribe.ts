const API_URL = import.meta.env.VITE_API_URL;

export async function subscribeUser() {
    //  Request permission for notifications
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        console.log("Permission not granted for Notification");
        return;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.ready;
    navigator.serviceWorker.ready.then((registration) => {
        console.log("Service worker ready:", registration);
    });

    // Delete old subscription if necessary
    const existingSubscription =
        await registration.pushManager.getSubscription();
    if (existingSubscription) {
        await existingSubscription.unsubscribe();
        console.log("Old subscription deleted");
    }

    // Create new subscription
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            import.meta.env.VITE_PUBLIC_VAPID_KEY,
        ),
    });
    console.log("User is subscribed:", subscription);

    // Send to server
    try {
        const response = await fetch(`${API_URL}/notifications/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subscription,
                user: "Invité",
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Subscription saved:", data);
            return true;
        } else {
            console.error("Server returned an error:", response.status, data);
            return false;
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        return false;
    }
}

// Converts the VAPID key to a Uint8Array
function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function sendTestNotification() {
    const response = await fetch(
        `${API_URL}/notifications/sendSingleNotification`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: "Invité",
            }),
        },
    );
    const data = await response.json();
    if (response.ok) {
        console.log("Notif sent:", data);
    } else {
        console.error("Server returned an error:", response.status, data);
    }
}
