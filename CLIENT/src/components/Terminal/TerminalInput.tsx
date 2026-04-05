import { useState, useRef, useEffect } from "react";

interface Props {
    handleCommand: (command: string) => void;
    history: string[];
}

export default function TerminalInput({
    handleCommand,
    history,
}: Readonly<Props>) {
    const [input, setInput] = useState("");
    const placeholderText =
        history.length === 0 ? "Tape 'Donne-moi un indice'" : "";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input.trim().toLowerCase());
            setInput("");
        }
    };

    const endRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const last = history.at(-1);
        const isFinalResponse =
            last?.startsWith("[🐱KiwIA]") &&
            last !== "[🐱KiwIA] Laisse-moi réfléchir...";
        if (!isFinalResponse) {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);

    return (
        <>
            <div ref={endRef} className="pt-4"></div>
            <div className="flex">
                <span className="text-white pr-2">$</span>
                <input
                    aria-label="Commande du terminal"
                    className="text-white outline-none border-none w-full"
                    autoFocus
                    type="text"
                    id="terminal-input"
                    value={input}
                    placeholder={placeholderText}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
}
