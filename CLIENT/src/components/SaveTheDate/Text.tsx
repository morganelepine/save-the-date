import type { ReactNode } from "react";
import TypewriterText from "./TypewriterText";

type Props = {
    typewriterIsOver: boolean;
    showFormattedText: boolean;
    setTypewriterIsOver: (over: boolean) => void;
};

const Text = ({
    typewriterIsOver,
    showFormattedText,
    setTypewriterIsOver,
}: Props) => {
    let content: ReactNode = (
        <TypewriterText setTypewriterIsOver={setTypewriterIsOver} />
    );

    if (typewriterIsOver && showFormattedText) {
        content = (
            <div className="space-y-4">
                <p>
                    <span className="text-sky-500 font-bold">Événement</span>{" "}
                    critique détecté
                </p>
                <p>
                    <span className="text-amber-500 font-bold">
                        Éléa & Païkan
                    </span>{" "}
                    lancent une&nbsp;
                    <span className="text-emerald-500 font-bold">
                        mise à jour MAJEURE
                    </span>{" "}
                    de&nbsp;leur&nbsp;histoire
                </p>
                <p>
                    Un{" "}
                    <span className="text-rose-500 font-bold">
                        marianniversaire
                    </span>{" "}
                    pour célébrer leurs{" "}
                    <span className="text-sky-500 font-bold">
                        105 ans d'amour
                    </span>
                </p>
                <p>
                    Une{" "}
                    <span className="text-violet-400 font-bold">
                        fête de mariage
                    </span>{" "}
                    mais sans&nbsp;paperasse quoi
                </p>
                <p>
                    Le week-end du{" "}
                    <span className="text-amber-500 font-bold">
                        36-54 avrillet 1968
                    </span>
                </p>
                <p>
                    <span className="text-rose-500 font-bold">SAVE</span>{" "}
                    <span className="text-sky-500 font-bold">THE</span>{" "}
                    <span className="text-violet-500 font-bold">DATE</span> ! !
                    !
                </p>
                <p>
                    <span className="text-emerald-500 font-bold">
                        Invitation officielle
                    </span>{" "}
                    en cours de&nbsp;déploiement
                    <span className="animate-pulse">...</span>
                </p>
            </div>
        );
    }

    if (typewriterIsOver && !showFormattedText) {
        content = null;
    }

    return (
        <div className="space-y-8 sm:text-2xl text-xl text-center">
            {content}
        </div>
    );
};

export default Text;
