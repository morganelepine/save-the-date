import { askAI } from "../services/ai";

const buildConversationHistory = (
    history: string[],
): { role: "user" | "assistant"; content: string }[] => {
    const result: { role: "user" | "assistant"; content: string }[] = [];
    for (const line of history) {
        if (line.startsWith("$ ")) {
            result.push({ role: "user", content: line.slice(2) });
        } else if (line.startsWith("[🐱KiwIA]")) {
            result.push({ role: "assistant", content: line });
        }
    }
    return result;
};

export const handleTerminalCommand = (
    command: string,
    history: string[],
    setHistory: (history: string[]) => void,
) => {
    if (!command.trim()) return;

    const conversationHistory = buildConversationHistory(history);
    const newHistory = [...history, `$ ${command}`];
    setHistory([...newHistory, "[🐱KiwIA] Laisse-moi réfléchir..."]);

    askAI(command, conversationHistory)
        .then((reply) => {
            setHistory([...newHistory, reply]);
        })
        .catch(() => {
            setHistory([
                ...newHistory,
                "[🐱KiwIA] Oops KiwIA est en train de faire la sieste...",
            ]);
        });
};
