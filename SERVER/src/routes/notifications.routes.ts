import { NotificationsController } from "../controllers/notifications.controllers";

type ControllerAction = keyof NotificationsController;

export const NotificationsRoutes: {
    method: "get" | "post" | "put" | "delete";
    route: string;
    controller: new () => NotificationsController;
    action: ControllerAction;
}[] = [
    {
        method: "post",
        route: "/notifications/subscribe",
        controller: NotificationsController,
        action: "subscribeToNotification",
    },
    {
        method: "post",
        route: "/notifications/sendSingleNotification",
        controller: NotificationsController,
        action: "sendSingleNotification",
    },
    {
        method: "post",
        route: "/notifications/sendCommonNotification",
        controller: NotificationsController,
        action: "sendCommonNotification",
    },
];
