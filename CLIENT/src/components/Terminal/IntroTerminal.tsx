export default function IntroTerminal() {
    return (
        <div className="w-full text-center sm:w-2xl">
            <h1
                className="text-center text-stone-800 text-xl mb-6 abril-fatface-regular"
                aria-label="Le jeu du Save the Date"
            >
                <span className="text-violet-400">The</span>{" "}
                <span className="text-emerald-500">Save</span>{" "}
                <span className="text-amber-500">The</span>{" "}
                <span className="text-sky-500">Date</span>{" "}
                <span className="text-rose-500">Game</span>
            </h1>
            <p>
                Pose une question à{" "}
                <span className="text-amber-500 josefin-sans-800">🐱KiwIA</span>{" "}
                dans le terminal puis clique sur 'Entrée'&nbsp;:
            </p>
            <p>
                il te donnera un indice sur la ville où se déroulera la
                fête&nbsp;!
            </p>
        </div>
    );
}
