import History from "../components/Terminal/History";
import TerminalInput from "../components/Terminal/TerminalInput";
import IntroTerminal from "../components/Terminal/IntroTerminal";
import BackToButton from "../components/utils/BackToButton";
import Background from "../components/utils/Background";

interface Props {
    handleCommand: (command: string) => void;
    history: string[];
    navigate: (path: string) => void;
}

export default function Terminal({
    handleCommand,
    history,
    navigate,
}: Readonly<Props>) {
    return (
        <Background>
            <IntroTerminal />

            <div className="flex flex-col bg-gray-800 border-4 border-gray-300 w-full sm:w-2xl rounded-md flex-1 min-h-0 my-4 font-mono">
                <div className="flex flex-col flex-1 min-h-0 overflow-auto p-4">
                    <div className="flex items-center mb-2">
                        <div className="flex space-x-2 mr-4">
                            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        </div>
                        <span className="text-gray-200 font-medium">
                            Terminal
                        </span>
                    </div>
                    <div>
                        {history.length > 0 && <History history={history} />}
                        <TerminalInput
                            handleCommand={handleCommand}
                            history={history}
                        />
                    </div>
                </div>
            </div>

            <BackToButton navigate={navigate} />
        </Background>
    );
}
