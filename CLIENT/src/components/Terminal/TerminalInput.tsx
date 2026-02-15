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
    const placeholderText = history.length === 0 ? "Tape 'where'" : "";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input.trim().toLowerCase());
            setInput("");
        }
    };

    const endRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <>
            <div ref={endRef} className="pt-4 sm:pt-6"></div>
            <div className="flex">
                <span className="text-white pr-2">$</span>
                <input
                    className="text-white outline-none border-none w-full"
                    autoFocus
                    type="text"
                    value={input}
                    placeholder={placeholderText}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
}
