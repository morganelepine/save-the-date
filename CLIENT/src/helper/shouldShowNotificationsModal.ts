export type NotificationsModalMode =
    | "subscribe"
    | "permission-blocked"
    | "ios-install-required";

export type NotificationsModalState = {
    shouldOpen: boolean;
    mode: NotificationsModalMode;
};

export const getNotificationsModalState = (): NotificationsModalState => {
    const dismissed =
        localStorage.getItem("notificationsModalDismissed") === "true";
    const typewriterIsOver =
        localStorage.getItem("typewriterIsOver") === "true";
    if (!typewriterIsOver || dismissed) {
        return { shouldOpen: false, mode: "subscribe" };
    }

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isPWA = globalThis.matchMedia("(display-mode: standalone)").matches;

    if (!("Notification" in globalThis)) {
        return { shouldOpen: false, mode: "subscribe" };
    }

    if (Notification.permission === "granted") {
        return { shouldOpen: false, mode: "subscribe" };
    }

    if (isIOS && !isPWA) {
        return { shouldOpen: true, mode: "ios-install-required" };
    }

    if (Notification.permission === "denied") {
        return { shouldOpen: true, mode: "permission-blocked" };
    }

    return { shouldOpen: true, mode: "subscribe" };
};

export const shouldShowNotifModal = () =>
    getNotificationsModalState().shouldOpen;
