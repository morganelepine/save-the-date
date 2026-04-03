interface Props {
    history: string[];
}

export default function History({ history }: Readonly<Props>) {
    return (
        <div className="mt-4">
            {history.map((line, index) => {
                const isCommand = line.startsWith("$");
                const spacing = isCommand && index !== 0 ? "mt-4" : "mt-1";
                const color = isCommand ? "text-amber-500" : "text-white";

                return (
                    <p
                        key={`${line}-${index}`}
                        className={`${color} ${spacing} ${color}`}
                    >
                        {line}
                    </p>
                );
            })}
        </div>
    );
}
