import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import Button from "../../components/utils/Button";
import { subscribeUser, sendTestNotification } from "../../subscribe";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NotificationsModal = ({ isOpen, setIsOpen }: Readonly<Props>) => {
    const hasPermission =
        "Notification" in globalThis && Notification.permission === "granted";

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (hasPermission) {
            setIsSubscribed(true);
        }
    }, [hasPermission]);

    const handleSubscribe = async () => {
        setIsLoading(true);

        try {
            const success = await subscribeUser();
            if (success) {
                setIsSubscribed(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendTestAndClose = () => {
        sendTestNotification();
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center bg-gray-500/75 sm:p-8 p-6 josefin-sans-400 text-stone-800">
                <DialogPanel className="max-w-xl space-y-8 rounded-lg bg-white sm:p-8 p-6 text-center">
                    <DialogTitle className="text-xl abril-fatface-regular">
                        <span className="text-violet-400">Pour</span>{" "}
                        <span className="text-emerald-500">ne</span>{" "}
                        <span className="text-amber-500">rien</span>{" "}
                        <span className="text-sky-500">louper</span>
                    </DialogTitle>

                    <Description>
                        Active les notifications pour recevoir les infos
                        importantes (promis, seulement l’essentiel — on n'aime
                        pas le spam non plus 😉)
                    </Description>

                    <div className="flex flex-col items-center justify-center space-y-4">
                        {isSubscribed ? (
                            <>
                                <p className="text-rose-500">
                                    Ton inscription a bien été prise en compte !
                                </p>
                                <Button
                                    label="Recevoir la notif de test"
                                    color="multi"
                                    onClick={handleSendTestAndClose}
                                />
                            </>
                        ) : (
                            <Button
                                label={
                                    isLoading
                                        ? "Activation en cours..."
                                        : "Activer les notifications"
                                }
                                color="multi"
                                disabled={isLoading}
                                onClick={handleSubscribe}
                            />
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default NotificationsModal;
