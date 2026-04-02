import Typewriter from "typewriter-effect";

type Props = {
    setTypewriterIsOver: (over: boolean) => void;
};

const TypewriterText = ({ setTypewriterIsOver }: Props) => {
    return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter
                    .typeString("Événement critique détecté")
                    .pauseFor(1000)
                    .typeString(
                        "<br/>Morgane & Arthur lancent une mise à jour maj",
                    )
                    .deleteChars(3)
                    .typeString("MAJEURE de leur histoire")
                    .pauseFor(1000)
                    .typeString("<br/>Un mariage")
                    .deleteChars(2)
                    .typeString(
                        "nniversaire pour célébrer leurs 15 ans d'amour",
                    )
                    .pauseFor(1000)
                    .typeString(
                        "<br/>Une fête de mariage mais sans paperasse quoi",
                    )
                    .pauseFor(1000)
                    .typeString("<br/>Le week-end du 13-14 juin 2026")
                    .pauseFor(1000)
                    .typeString("<br/>SAVE THE DATE ! ! !")
                    .pauseFor(1000)
                    .typeString(
                        "<br/>Invitation officielle en cours de déploiement... ",
                    )
                    .pauseFor(1500)
                    .callFunction(() => {
                        setTypewriterIsOver(true);
                        localStorage.setItem("typewriterIsOver", "true");
                    })
                    .start();
            }}
            options={{
                delay: 90,
            }}
        />
    );
};

export default TypewriterText;
