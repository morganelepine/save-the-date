import { useState } from "react";
import AddToScreenModal from "../components/Home/AddToScreenModal";
import Background from "../components/utils/Background";
import Button from "../components/utils/Button";
import { colorTitle } from "../helper/setWordInColor";

interface Props {
    navigate: (path: string) => void;
}

const Registration = ({ navigate }: Props) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [modalIsOpen, setModalIsOpen] = useState(isMobile);

    return (
        <Background>
            <AddToScreenModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
            <div className="flex flex-col justify-center items-center m-4 space-y-6 h-full sm:w-lg">
                <h1 className="abril-fatface-regular text-2xl">
                    {colorTitle("Bienvenue")}
                </h1>
                <Button
                    type="submit"
                    label="Découvrir le projet secret"
                    color="multi"
                    className="max-w-max"
                    onClick={() => navigate("/save-the-date")}
                />
            </div>
        </Background>
    );
};

export default Registration;
