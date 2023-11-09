function Button({
    children,
    onClick,
    className,
    bgColor = "primary",
    fullWidth = false,
}) {
    let color = "bg-primary";
    switch (bgColor) {
        case "primary":
            color = "bg-primary";
            break;
        case "secondary":
            color = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button
            onClick={onClick}
            className={`${
                fullWidth ? "w-full" : ""
            } py-3 mt-auto font-bold text-white rounded-lg ${color} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
