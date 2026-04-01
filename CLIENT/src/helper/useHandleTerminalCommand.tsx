const moreHints = [
    '[HINT] La préfecture de ce département est une "ville de riches"',
    "[HINT] Non loin du lieu, un village a donné son nom à un fromage de chèvre",
    "[HINT] Un autre village des alentours porte le nom d'un célèbre vin blanc",
];
const firstEndMessage = "C'est tout ...pour le moment";
const secondEndMessage = "C'est tout on a dit !!!";

export const handleTerminalCommand = (
    command: string,
    history: string[],
    setHistory: (history: string[]) => void,
    moreCount: number,
    setMoreCount: (count: number) => void,
    setAnimationKey: (key: number) => void,
) => {
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
                "_where: Obtenir UN indice sur le lieu",
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
