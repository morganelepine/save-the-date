// Permission already granted: no modal
// Android and desktop: modal
// iOS navigator: alert (notif only supported on PWA)
// iOS PWA: modal

export const shouldShowNotifModal = () => {
    const typewriterIsOver = localStorage.getItem("typewriterIsOver");
    if (!typewriterIsOver) return false;

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isPWA = globalThis.matchMedia("(display-mode: standalone)").matches;

    if (
        !("Notification" in globalThis) ||
        Notification.permission === "granted"
    ) {
        return false;
    }

    if (isIOS) {
        if (!isPWA) {
            alert(
                "Pour recevoir les notifications sur iPhone, installe l’app sur l’écran d’accueil",
            );
        }
        return isPWA;
    }

    return true; // Desktop + Android
};
