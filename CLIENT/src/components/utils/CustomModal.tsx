import { Dialog, DialogPanel } from "@headlessui/react";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
    preventClickOutside?: boolean; // default to false
}

const CustomModal = ({
    isOpen,
    setIsOpen,
    children,
    preventClickOutside = false,
}: Readonly<Props>) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(preventClickOutside)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center bg-gray-500/75 backdrop-blur-xs sm:p-8 p-6 josefin-sans-400 text-stone-800">
                <DialogPanel className="max-w-2xl space-y-8 rounded-lg bg-white sm:p-8 p-6 text-center">
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default CustomModal;
