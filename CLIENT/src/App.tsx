import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Registration from "./screens/Registration";
import Terminal from "./screens/Terminal";
import SaveTheDate from "./screens/SaveTheDate";
import { handleTerminalCommand } from "./hooks/useHandleTerminalCommand";

export default function App() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<string[]>([]);
    const [typewriterIsOver, setTypewriterIsOver] = useState<boolean>(false);
    const [animationKey, setAnimationKey] = useState(0);
    const [moreCount, setMoreCount] = useState(0);

    useEffect(() => {
        const typewriterIsOver = localStorage.getItem("typewriterIsOver");
        if (typewriterIsOver === "true") {
            setTypewriterIsOver(true);
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Registration navigate={navigate} />} />
            <Route
                path="/save-the-date"
                element={
                    <SaveTheDate
                        navigate={navigate}
                        typewriterIsOver={typewriterIsOver}
                        setTypewriterIsOver={setTypewriterIsOver}
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
                        handleCommand={(command) =>
                            handleTerminalCommand(
                                command,
                                history,
                                setHistory,
                                moreCount,
                                setMoreCount,
                                setAnimationKey,
                            )
                        }
                    />
                }
            />
        </Routes>
    );
}
