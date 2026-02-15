interface Props {
    history: string[];
}

export default function History({ history }: Readonly<Props>) {
    return (
        <div className="space-y-1 mt-4">
            {history.map((line, index) => {
                let color = "text-white";

                if (line.startsWith("[ERROR]")) color = "text-red-400";
                else if (line.startsWith("[INFO]") || line.startsWith("_"))
                    color = "text-emerald-400";
                else if (line.startsWith("[HINT]") || line.startsWith("Indice"))
                    color = "text-sky-300";
                else if (line.startsWith("[WARN]")) color = "text-amber-500";

                return (
                    <p key={`${line}-${index}`} className={`${color}`}>
                        {line}
                    </p>
                );
            })}
        </div>
    );
}
