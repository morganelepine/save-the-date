import { useEffect, useState } from "react";
import Background from "../components/utils/Background";
import Buttons from "../components/SaveTheDate/Buttons";
import Text from "../components/SaveTheDate/Text";
import Confettis from "../components/utils/Confettis";
import Button from "../components/utils/Button";
import NotificationsModal from "../components/SaveTheDate/NotificationsModal";
import { shouldShowNotifModal } from "../helper/shouldShowNotificationsModal";

type Props = {
    name: string | null;
    navigate: (path: string) => void;
    typewriterOver: boolean;
    setTypewriterOver: (value: boolean) => void;
    animationKey: number;
};

const SaveTheDate = ({
    name,
    navigate,
    typewriterOver,
    setTypewriterOver,
    animationKey,
}: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(shouldShowNotifModal);

    const [selected, setSelected] = useState<string | null>(null);
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("typewriterOver");
        if (stored === "true") {
            setTypewriterOver(true);
        }
        const response = localStorage.getItem("response");
        if (response) {
            setSelected(response);
            setIsExploding(true);
        }
    }, []);

    const chooseResponse = async (action: string) => {
        setSelected(action);
        localStorage.setItem("response", action);
        setIsExploding(true);
        await fetch(
            "https://script.google.com/macros/s/AKfycbxUp-HqQQrm4l_3fSN5fwjqj4TauaWTrJfQtGWmqs6Zfy0RkGH91bMSrCWzg4v5sUqX/exec",
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({ name, action }),
                headers: { "Content-Type": "application/json" },
            },
        );
    };

    return (
        <Background>
            <div className="flex flex-col w-full sm:max-w-4xl">
                <NotificationsModal
                    name={name}
                    isOpen={modalIsOpen}
                    setIsOpen={setModalIsOpen}
                ></NotificationsModal>

                <Text
                    key={animationKey}
                    typewriterOver={typewriterOver}
                    setTypewriterOver={(value) => {
                        setTypewriterOver(value);
                        if (value) {
                            localStorage.setItem("typewriterOver", "true");
                        }
                    }}
                />

                {typewriterOver && !selected && (
                    <Buttons chooseResponse={chooseResponse} />
                )}

                {typewriterOver && selected && (
                    <>
                        {isExploding && <Confettis />}
                        <Button
                            label="Envie d'en savoir plus ? 👀"
                            color="multi"
                            onClick={() => navigate("/terminal")}
                            className="flex self-center justify-center mt-8"
                        />
                    </>
                )}
            </div>
        </Background>
    );
};

export default SaveTheDate;
