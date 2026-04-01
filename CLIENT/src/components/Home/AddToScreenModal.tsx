import { DialogTitle } from "@headlessui/react";
import Button from "../utils/Button";
import CustomModal from "../utils/CustomModal";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AddToScreenModal = ({ isOpen, setIsOpen }: Readonly<Props>) => {
    return (
        <CustomModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            preventClickOutside={true}
        >
            <DialogTitle className="josefin-sans-800">
                Pour une meilleure expérience, <br /> ajoute l'app à ton écran
                d'accueil&nbsp;!
            </DialogTitle>
            <div className="flex flex-col space-y-6 text-left">
                <div className="flex items-center gap-2 flex-nowrap">
                    <div className="w-6 h-6 pt-0.5 flex items-center justify-center rounded-full bg-sky-500 text-white text-sm">
                        1
                    </div>
                    <p className="flex flex-wrap items-center whitespace-nowrap">
                        Clique sur le menu
                        <EllipsisVerticalIcon
                            className="w-5 h-5 fill-sky-500"
                            aria-hidden="true"
                        />
                        en haut à droite
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 pt-0.5 flex items-center justify-center rounded-full bg-violet-500 text-white text-sm">
                        2
                    </div>
                    <p>Sélectionne "Ajouter à l'écran d'accueil"</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 pt-0.5 flex items-center justify-center rounded-full bg-pink-500 text-white text-sm">
                        3
                    </div>
                    <p>Confirme en cliquant sur "Installer"</p>
                </div>
            </div>
            <Button
                label="Compris !"
                color="multi"
                className="max-w-max"
                onClick={() => setIsOpen(false)}
            />
        </CustomModal>
    );
};

export default AddToScreenModal;
