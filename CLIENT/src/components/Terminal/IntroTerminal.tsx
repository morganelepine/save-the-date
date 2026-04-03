export default function IntroTerminal() {
    return (
        <div className="w-full text-center sm:w-2xl">
            <h1 className="text-center text-stone-800 text-xl mb-6 abril-fatface-regular">
                <span className="text-violet-400">Le</span>{" "}
                <span className="text-emerald-500">Save</span>{" "}
                <span className="text-amber-500">the</span>{" "}
                <span className="text-sky-500">Date</span>{" "}
                <span className="text-rose-500">interactif</span>
            </h1>
            <p>
                Pose une question à{" "}
                <span className="text-rose-500 josefin-sans-800">KiwIA</span>{" "}
                dans le terminal&nbsp;: il te donnera un indice sur la ville où
                se déroulera la fête&nbsp;!
            </p>
        </div>
    );
}
