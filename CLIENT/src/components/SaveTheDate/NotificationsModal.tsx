import { useState } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Description,
} from "@headlessui/react";
import Button from "../../components/utils/Button";
import { subscribeUser, sendTestNotification } from "../../services/subscribe";
import type { NotificationsModalMode } from "../../helper/shouldShowNotificationsModal";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    mode: NotificationsModalMode;
}

const NotificationsModal = ({ isOpen, setIsOpen, mode }: Readonly<Props>) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem("notificationsModalDismissed", "true");
    };

    const handleSubscribe = async () => {
        setIsLoading(true);
        setFeedback(null);

        try {
            const result = await subscribeUser();
            setFeedback(result.message);
            if (result.success) {
                setIsSubscribed(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendTestAndClose = async () => {
        setIsLoading(true);
        setFeedback(null);

        try {
            const result = await sendTestNotification();
            setFeedback(result.message);
            if (result.success) {
                setIsOpen(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    let actionContent = (
        <Button
            label={
                isLoading
                    ? "Activation en cours..."
                    : "Activer les notifications"
            }
            color="multi"
            disabled={isLoading || mode === "permission-blocked"}
            onClick={handleSubscribe}
        />
    );

    if (mode === "ios-install-required") {
        actionContent = (
            <Button
                label="Fermer"
                color="multi"
                onClick={() => setIsOpen(false)}
            />
        );
    }

    if (isSubscribed) {
        actionContent = (
            <Button
                label={
                    isLoading
                        ? "Envoi en cours..."
                        : "Recevoir la notif de test"
                }
                color="multi"
                disabled={isLoading}
                onClick={handleSendTestAndClose}
            />
        );
    }

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
                        importantes (promis, seulement l’essentiel, on n'aime
                        pas le spam non plus 😉)
                    </Description>

                    {mode === "ios-install-required" && (
                        <p className="text-sm text-stone-700 italic">
                            Sur iPhone, les notifications fonctionnent
                            uniquement si l’app est installée sur l’écran
                            d’accueil.
                        </p>
                    )}

                    {mode === "permission-blocked" && (
                        <p className="text-sm text-stone-700 italic">
                            Les notifications sont bloquées dans le navigateur.
                            Autorise-les dans les réglages du site puis recharge
                            la page.
                        </p>
                    )}

                    <div className="flex flex-col items-center justify-center space-y-4">
                        {actionContent}

                        <button
                            onClick={closeModal}
                            className="italic text-sm cursor-pointer hover:underline hover:underline-offset-6"
                        >
                            Ne plus me demander
                        </button>

                        {feedback && (
                            <p className="text-sm text-stone-700 italic">
                                {feedback}
                            </p>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default NotificationsModal;
