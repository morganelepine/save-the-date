interface Props {
    navigate: (path: string) => void;
}

export default function BackToButton({ navigate }: Readonly<Props>) {
    const handleClick = () => {
        navigate("/save-the-date");
        localStorage.setItem("backToSaveTheDate", "true");
    };

    return (
        <button
            className="flex items-center gap-2 cursor-pointer border rounded-full py-2 px-4 border-gray-300 hover:border-gray-400 text-sm"
            onClick={handleClick}
            style={{ lineHeight: "unset" }}
        >
            <span className="text-violet-400">Retour</span>
            <span className="text-emerald-500">au</span>
            <span className="text-amber-500">Save</span>
            <span className="text-sky-500">the</span>
            <span className="text-rose-500">Date</span>
        </button>
    );
}
