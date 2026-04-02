import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
    getNotificationsModalState,
    shouldShowNotifModal,
} from "../shouldShowNotificationsModal";

// npx vitest test

const setUserAgent = (ua: string) => {
    Object.defineProperty(navigator, "userAgent", {
        value: ua,
        configurable: true,
    });
};

const mockMatchMedia = (matches: boolean) => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches }));
};

const mockNotification = (permission: NotificationPermission | undefined) => {
    if (!permission) {
        // @ts-expect-error
        delete globalThis.Notification;
        return;
    }

    // @ts-expect-error
    globalThis.Notification = { permission };
};

describe("shouldShowNotifModal", () => {
    beforeEach(() => {
        vi.stubGlobal("localStorage", {
            getItem: vi.fn().mockReturnValue("true"),
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should return false if Notification is not supported", () => {
        mockNotification(undefined);
        mockMatchMedia(true);
        setUserAgent("Android");

        expect(shouldShowNotifModal()).toBe(false);
    });

    it("should return false if permission is already granted", () => {
        mockNotification("granted");
        mockMatchMedia(true);
        setUserAgent("Android");

        expect(shouldShowNotifModal()).toBe(false);
    });

    it("should return true on Android if permission is not granted", () => {
        mockNotification("default");
        mockMatchMedia(false);
        setUserAgent("Android");

        expect(shouldShowNotifModal()).toBe(true);
        expect(getNotificationsModalState().mode).toBe("subscribe");
    });

    it("should return true on Desktop if permission is not granted", () => {
        mockNotification("default");
        mockMatchMedia(false);
        setUserAgent("Desktop");

        expect(shouldShowNotifModal()).toBe(true);
        expect(getNotificationsModalState().mode).toBe("subscribe");
    });

    it("should return true on iOS but not PWA with install-required mode", () => {
        mockNotification("default");
        mockMatchMedia(false);
        setUserAgent("iPhone");

        expect(shouldShowNotifModal()).toBe(true);
        expect(getNotificationsModalState().mode).toBe("ios-install-required");
    });

    it("should return true on an iOs PWA", () => {
        mockNotification("default");
        mockMatchMedia(true);
        setUserAgent("iPhone");

        expect(shouldShowNotifModal()).toBe(true);
        expect(getNotificationsModalState().mode).toBe("subscribe");
    });

    it("should open modal in permission-blocked mode", () => {
        mockNotification("denied");
        mockMatchMedia(false);
        setUserAgent("Desktop");

        expect(shouldShowNotifModal()).toBe(true);
        expect(getNotificationsModalState().mode).toBe("permission-blocked");
    });
});
