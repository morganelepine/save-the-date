import type { PropsWithChildren } from "react";

const Background = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="bg-stone-100 flex flex-col items-center justify-center w-full px-4 py-6 josefin-sans-400"
            style={{ height: "100dvh" }}
        >
            {children}
        </div>
    );
};

export default Background;
