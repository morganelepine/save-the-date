import { useEffect, useState } from "react";
import Background from "../components/utils/Background";
import Button from "../components/utils/Button";

interface Props {
    navigate: (path: string) => void;
    setName: (name: string) => void;
}

const Registration = ({ navigate, setName }: Props) => {
    const [inputName, setInputName] = useState("");

    useEffect(() => {
        const savedName = localStorage.getItem("saveTheDate-name");
        if (savedName) {
            setName(savedName);
            navigate("/save-the-date");
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.trim()) {
            localStorage.setItem("saveTheDate-name", inputName.trim());
            setName(inputName.trim());
            navigate("/save-the-date");
        }
    };

    return (
        <Background>
            <div className="flex flex-col justify-center m-4 space-y-6 h-full sm:w-lg">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6"
                >
                    <div className="text-center space-y-6">
                        <h1 className="abril-fatface-regular text-2xl font-bold text-emerald-600">
                            <span className="text-violet-400">B</span>{" "}
                            <span className="text-emerald-500">I</span>{" "}
                            <span className="text-amber-500">E</span>{" "}
                            <span className="text-sky-500">N</span>{" "}
                            <span className="text-rose-500">V</span>{" "}
                            <span className="text-violet-400">E</span>{" "}
                            <span className="text-emerald-500">N</span>{" "}
                            <span className="text-amber-500">U</span>{" "}
                            <span className="text-sky-500">E</span>{" "}
                        </h1>
                        <label htmlFor="name">
                            Avant de commencer, quel est ton&nbsp;prénom ?
                        </label>
                        <p className="text-sm text-gray-500 mt-2">
                            Si tu t'appelles Guillaume, Julien, Pierre ou
                            Thomas, ajoute l'initiale de ton nom (exemple :
                            "Thomas-M")
                        </p>
                    </div>
                    <input
                        id="name"
                        type="text"
                        required
                        className="w-full border rounded-full px-4 bg-stone-50 border-gray-400 p-2 focus:border-sky-500 focus:outline focus:outline-sky-500"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <Button
                        type="submit"
                        label="Découvrir le projet"
                        color="multi"
                        className="max-w-max"
                    />
                </form>
            </div>
        </Background>
    );
};

export default Registration;
