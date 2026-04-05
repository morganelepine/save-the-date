import { useEffect, useRef } from "react";

interface Props {
    history: string[];
}

export default function History({ history }: Readonly<Props>) {
    const lastCmdRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const last = history.at(-1);
        const isFinalResponse =
            last?.startsWith("[🐱KiwIA]") &&
            last !== "[🐱KiwIA] Laisse-moi réfléchir...";
        if (isFinalResponse) {
            lastCmdRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [history]);

    const lastCmdIndex = history.reduceRight(
        (acc, line, i) => (acc === -1 && line.startsWith("$ ") ? i : acc),
        -1,
    );

    return (
        <div
            role="log"
            aria-live="polite"
            aria-label="Historique du terminal"
            className="mt-4"
        >
            {history.map((line, index) => {
                const isCommand = line.startsWith("$");
                const spacing = isCommand && index !== 0 ? "mt-4" : "mt-1";
                const color = isCommand ? "text-amber-500" : "text-white";

                return (
                    <p
                        key={`${line}-${index}`}
                        ref={index === lastCmdIndex ? lastCmdRef : undefined}
                        className={`${color} ${spacing}`}
                    >
                        {line}
                    </p>
                );
            })}
        </div>
    );
}
