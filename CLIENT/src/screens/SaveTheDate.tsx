import { useEffect, useState } from "react";
import Background from "../components/utils/Background";
import Text from "../components/SaveTheDate/Text";
import Button from "../components/utils/Button";
import NotificationsModal from "../components/SaveTheDate/NotificationsModal";
import Celebration from "../components/SaveTheDate/Celebration";
import { getNotificationsModalState } from "../helper/shouldShowNotificationsModal";

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
    const initialModalState = getNotificationsModalState();
    const [modalIsOpen, setModalIsOpen] = useState(
        initialModalState.shouldOpen,
    );
    const [notificationsModalMode] = useState(initialModalState.mode);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showFormattedText, setShowFormattedText] =
        useState(typewriterIsOver);
    const [showButton, setShowButton] = useState(typewriterIsOver);

    useEffect(() => {
        if (typewriterIsOver) {
            setShowCelebration(true);
            setShowButton(true);
        }
    }, [typewriterIsOver]);

    useEffect(() => {
        if (localStorage.getItem("backToSaveTheDate") === "true") {
            setShowFormattedText(true);
            setShowButton(true);
        }
    }, []);

    return (
        <Background>
            <div className="flex flex-col w-full sm:max-w-4xl">
                <NotificationsModal
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                    mode={notificationsModalMode}
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

                {showCelebration && <Celebration />}

                {showButton && (
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
