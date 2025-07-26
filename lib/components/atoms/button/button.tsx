interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  variant,
  size,
  fullWidth,
  isLoading,
  icon,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-primary-100 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    text: "text-blue-600 hover:text-blue-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${
        variant ? variantClasses[variant] : variantClasses.primary
      } ${size ? sizeClasses[size] : sizeClasses.md} ${
        fullWidth ? "w-full" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? <span className="loader"></span> : icon}
      {children}
    </button>
  );
};
