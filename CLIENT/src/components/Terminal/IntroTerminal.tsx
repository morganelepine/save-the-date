export default function IntroTerminal() {
    return (
        <div className="w-full sm:w-2xl">
            <h1 className="text-center text-stone-800 text-xl mb-6 abril-fatface-regular">
                <span className="text-violet-400">Le</span>{" "}
                <span className="text-emerald-500">Save</span>{" "}
                <span className="text-amber-500">the</span>{" "}
                <span className="text-sky-500">Date</span>{" "}
                <span className="text-rose-500">interactif</span>
            </h1>
            <div className="flex flex-col gap-2">
                <p className="italic">Comment ça marche ?</p>
                <p>
                    Écris l'une des commandes suivantes dans le&nbsp;terminal
                    puis tape sur Entrée :
                </p>
                <ul className="list-disc list-outside ml-4">
                    <li>
                        <span className="font-bold text-violet-400">help</span>{" "}
                        : Afficher la liste des&nbsp;commandes
                    </li>
                    <li>
                        <span className="font-bold text-sky-600">where</span> :
                        Obtenir UN indice sur le&nbsp;lieu
                    </li>
                    <li>
                        <span className="font-bold text-rose-500">more</span> :
                        Obtenir d'autres indices
                    </li>
                    <li>
                        <span className="font-bold text-emerald-500">
                            reset
                        </span>{" "}
                        : Effacer l'historique
                    </li>
                </ul>
            </div>
        </div>
    );
}
