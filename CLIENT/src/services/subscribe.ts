const API_URL = import.meta.env.VITE_API_URL;

type SubscribeResult = {
    success: boolean;
    message: string;
};

type ApiErrorBody = {
    error?: string;
    message?: string;
};

type NotificationSubscriptionPayload = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};

const isPushSupported = () => {
    return (
        "Notification" in globalThis &&
        "serviceWorker" in navigator &&
        "PushManager" in globalThis
    );
};

const getErrorMessageFromResponse = async (
    response: Response,
    fallback: string,
) => {
    const rawText = await response.text();

    if (!rawText) {
        return `${fallback} (HTTP ${response.status})`;
    }

    try {
        const parsed = JSON.parse(rawText) as ApiErrorBody;
        return (
            parsed.error ??
            parsed.message ??
            `${fallback} (HTTP ${response.status})`
        );
    } catch {
        return `${fallback} (HTTP ${response.status})`;
    }
};

const getCurrentSubscription =
    async (): Promise<NotificationSubscriptionPayload | null> => {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
            await registration.pushManager.getSubscription();

        if (!existingSubscription) {
            return null;
        }

        const serialized = existingSubscription.toJSON();
        if (
            !serialized.endpoint ||
            !serialized.keys?.p256dh ||
            !serialized.keys?.auth
        ) {
            return null;
        }

        return {
            endpoint: serialized.endpoint,
            keys: {
                p256dh: serialized.keys.p256dh,
                auth: serialized.keys.auth,
            },
        };
    };

export async function subscribeUser(): Promise<SubscribeResult> {
    if (!isPushSupported()) {
        return {
            success: false,
            message:
                "Ce navigateur ne supporte pas les notifications push (service worker requis)",
        };
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            return {
                success: false,
                message:
                    permission === "denied"
                        ? "Les notifications sont bloquées. Autorisez-les dans les réglages du navigateur."
                        : "Autorisation notifications non accordée",
            };
        }

        const registration = await navigator.serviceWorker.ready;
        const currentSubscription =
            await registration.pushManager.getSubscription();
        const subscription =
            currentSubscription ??
            (await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    import.meta.env.VITE_PUBLIC_VAPID_KEY,
                ),
            }));

        const serialized = subscription.toJSON();
        if (
            !serialized.endpoint ||
            !serialized.keys?.p256dh ||
            !serialized.keys?.auth
        ) {
            return {
                success: false,
                message: "Abonnement invalide",
            };
        }

        const response = await fetch(`${API_URL}/notifications/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subscription: {
                    endpoint: serialized.endpoint,
                    keys: {
                        p256dh: serialized.keys.p256dh,
                        auth: serialized.keys.auth,
                    },
                },
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                message: await getErrorMessageFromResponse(
                    response,
                    "Impossible d'enregistrer l'abonnement",
                ),
            };
        }

        return {
            success: true,
            message: "Notifications activées avec succès !",
        };
    } catch (error) {
        console.error("subscribeUser failed", error);
        return {
            success: false,
            message: "Une erreur est survenue pendant l'activation",
        };
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

export async function sendTestNotification(): Promise<SubscribeResult> {
    if (!isPushSupported()) {
        return {
            success: false,
            message: "Notifications push non supportées sur cet appareil",
        };
    }

    try {
        const subscription = await getCurrentSubscription();

        if (!subscription) {
            return {
                success: false,
                message: "Aucun abonnement actif trouvé sur cet appareil",
            };
        }

        const response = await fetch(
            `${API_URL}/notifications/sendSingleNotification`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscription }),
            },
        );

        if (!response.ok) {
            return {
                success: false,
                message: await getErrorMessageFromResponse(
                    response,
                    "Échec de l'envoi de la notification de test",
                ),
            };
        }

        return {
            success: true,
            message: "Notification de test envoyée !",
        };
    } catch (error) {
        console.error("sendTestNotification failed", error);
        return {
            success: false,
            message: "Une erreur est survenue pendant l'envoi du test",
        };
    }
}
