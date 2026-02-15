import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Registration from "./screens/Registration";
import Terminal from "./screens/Terminal";
import SaveTheDate from "./screens/SaveTheDate";

export default function App() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<string[]>([]);
    const [typewriterOver, setTypewriterOver] = useState<boolean>(false);
    const [animationKey, setAnimationKey] = useState(0);
    const [moreCount, setMoreCount] = useState(0);

    const moreHints = [
        '[HINT] La préfecture de ce département est une "ville de riches"',
        "[HINT] Non loin du lieu, un village a donné son nom à un fromage de chèvre",
        "[HINT] Un autre village des alentours porte le nom d'un célèbre vin blanc",
    ];
    const firstEndMessage = "C'est tout ...pour le moment";
    const secondEndMessage = "C'est tout on a dit !!!";

    const handleCommand = (command: string) => {
        const newHistory = [...history, `$ ${command}`];

        switch (command.toLowerCase()) {
            case "reset":
                setAnimationKey((prev) => prev + 1);
                setHistory([]);
                setMoreCount(0);
                return;

            case "where":
                setHistory([
                    ...newHistory,
                    "[HINT] On trouve dans la région certains des plus beaux châteaux du pays",
                ]);
                return;

            case "more":
                if (moreCount < moreHints.length) {
                    setHistory([...newHistory, moreHints[moreCount]]);
                } else if (moreCount > moreHints.length) {
                    setHistory([...newHistory, `[ERROR] ${secondEndMessage}`]);
                } else {
                    setHistory([...newHistory, `[WARN] ${firstEndMessage}`]);
                }
                setMoreCount(moreCount + 1);
                return;

            case "help":
                setHistory([
                    ...newHistory,
                    "[INFO]",
                    "_help: Afficher la liste des commandes",
                    "_where: Obtenir un indice sur le lieu",
                    "_more: Obtenir d'autres indices",
                    "_reset: Effacer l'historique",
                ]);
                return;

            default:
                setHistory([
                    ...newHistory,
                    `[ERROR] Commande inconnue : ${command}`,
                ]);
                return;
        }
    };

    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        const savedName = localStorage.getItem("saveTheDate-name");
        if (savedName) {
            setName(savedName);
        }
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={<Registration navigate={navigate} setName={setName} />}
            />
            <Route
                path="/save-the-date"
                element={
                    <SaveTheDate
                        navigate={navigate}
                        name={name}
                        typewriterOver={typewriterOver}
                        setTypewriterOver={setTypewriterOver}
                        animationKey={animationKey}
                    />
                }
            />
            <Route
                path="/terminal"
                element={
                    <Terminal
                        navigate={navigate}
                        history={history}
                        handleCommand={handleCommand}
                    />
                }
            />
        </Routes>
    );
}
