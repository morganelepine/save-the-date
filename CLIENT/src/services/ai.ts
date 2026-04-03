const API_URL = import.meta.env.VITE_API_URL;

export const askAI = async (
    command: string,
    conversationHistory: { role: "user" | "assistant"; content: string }[],
): Promise<string> => {
    const response = await fetch(`${API_URL}/ai/hint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command, conversationHistory }),
    });

    if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
    }

    const data = (await response.json()) as { reply: string };
    return data.reply;
};
