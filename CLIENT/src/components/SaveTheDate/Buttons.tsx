import Button from "../utils/Button";

type Props = {
    chooseResponse: (action: string) => Promise<void>;
};

const Buttons = ({ chooseResponse }: Props) => {
    return (
        <div className="flex flex-col items-center sm:flex-row gap-4 mt-8 mb-2">
            <Button
                label="Je bloque la date 🥳"
                value="yes"
                color="green"
                onClick={(value) => {
                    chooseResponse(value ?? "");
                }}
                className="sm:w-1/3 w-3/4"
            />
            <Button
                label="J'attends la suite... 😇"
                value="maybe"
                color="violet"
                onClick={(value) => {
                    chooseResponse(value ?? "");
                }}
                className="sm:w-1/3 w-3/4"
            />
            <Button
                label="Je ne suis pas dispo 😭"
                value="no"
                color="red"
                onClick={(value) => {
                    chooseResponse(value ?? "");
                }}
                className="sm:w-1/3 w-3/4"
            />
        </div>
    );
};

export default Buttons;
