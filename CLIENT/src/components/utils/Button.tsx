type ButtonProps = {
    type?: "button" | "submit" | "reset";
    className?: string;
    label: string;
    value?: string;
    color: "green" | "violet" | "red" | "multi";
    disabled?: boolean;
    onClick?: (value: string | undefined) => void;
};

const Button = ({
    type,
    className,
    label,
    value,
    color,
    disabled,
    onClick,
}: ButtonProps) => {
    const baseClasses = "text-white cursor-pointer rounded-full px-8 py-2";
    const colorMap = {
        green: {
            bg: "bg-gradient-to-r from-teal-600 to-emerald-500",
            hover: "hover:bg-gradient-to-l from-teal-600 to-emerald-500",
        },
        violet: {
            bg: "bg-gradient-to-r from-fuchsia-600 to-violet-600",
            hover: "hover:bg-gradient-to-l from-fuchsia-600 to-violet-600",
        },
        red: {
            bg: "bg-gradient-to-r from-orange-500 to-red-500",
            hover: "hover:bg-gradient-to-l from-orange-500 to-red-500",
        },
        multi: {
            bg: "bg-gradient-to-r from-sky-500 via-purple-500 to-rose-500",
            hover: "hover:bg-gradient-to-l from-sky-500 via-purple-500 to-rose-500",
        },
    };

    const colorClasses = colorMap[color];

    return (
        <button
            type={type || "button"}
            onClick={() => onClick?.(value)}
            className={`${className ?? ""} ${baseClasses} ${
                colorClasses.hover
            } ${colorClasses.bg}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
