import type { JSX } from "react";

const colors: string[] = [
    "text-violet-400",
    "text-emerald-500",
    "text-amber-500",
    "text-sky-500",
    "text-rose-500",
];

export const colorTitle = (title: string): JSX.Element => {
    return (
        <>
            {title.split("").map((letter, index) => {
                const color = colors[index % colors.length];

                return (
                    <span
                        key={`${index}-${letter}`}
                        className={`${color} uppercase px-1 abril-fatface-regular`}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                );
            })}
        </>
    );
};
