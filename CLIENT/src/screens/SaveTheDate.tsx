import { useEffect, useState } from "react";
import Background from "../components/utils/Background";
import Text from "../components/SaveTheDate/Text";
import Button from "../components/utils/Button";
import Celebration from "../components/SaveTheDate/Celebration";

type Props = {
    navigate: (path: string) => void;
    typewriterIsOver: boolean;
    setTypewriterIsOver: (value: boolean) => void;
};

const SaveTheDate = ({
    navigate,
    typewriterIsOver,
    setTypewriterIsOver,
}: Props) => {
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
                <Text
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
