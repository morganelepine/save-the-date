import { useEffect, useState } from "react";
import Background from "../components/utils/Background";
import Text from "../components/SaveTheDate/Text";
import Button from "../components/utils/Button";
import NotificationsModal from "../components/SaveTheDate/NotificationsModal";
import Celebration from "../components/SaveTheDate/Celebration";
import { shouldShowNotifModal } from "../helper/shouldShowNotificationsModal";

type Props = {
    navigate: (path: string) => void;
    typewriterIsOver: boolean;
    setTypewriterIsOver: (value: boolean) => void;
    animationKey: number;
};

const SaveTheDate = ({
    navigate,
    typewriterIsOver,
    setTypewriterIsOver,
    animationKey,
}: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(shouldShowNotifModal());
    const [showCelebration, setShowCelebration] = useState(false);
    const [showFormattedText, setShowFormattedText] =
        useState(typewriterIsOver);

    useEffect(() => {
        if (!typewriterIsOver || showFormattedText) {
            return;
        }

        setShowCelebration(true);
        const timeout = globalThis.setTimeout(() => {
            setShowCelebration(false);
            setShowFormattedText(true);
        }, 2400);

        return () => globalThis.clearTimeout(timeout);
    }, [typewriterIsOver, showFormattedText]);

    return (
        <Background>
            <div className="flex flex-col w-full sm:max-w-4xl">
                <NotificationsModal
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                ></NotificationsModal>

                <Text
                    key={animationKey}
                    typewriterIsOver={typewriterIsOver}
                    showFormattedText={showFormattedText}
                    setTypewriterIsOver={(value) => {
                        setTypewriterIsOver(value);
                        if (value) {
                            localStorage.setItem("typewriterIsOver", "true");
                        }
                    }}
                />

                {!showCelebration && <Celebration />}

                {showFormattedText && (
                    <Button
                        label="Envie d'en savoir plus ? 👀"
                        color="multi"
                        onClick={() => navigate("/terminal")}
                        className="flex self-center justify-center mt-8"
                    />
                )}
            </div>
        </Background>
    );
};

export default SaveTheDate;
