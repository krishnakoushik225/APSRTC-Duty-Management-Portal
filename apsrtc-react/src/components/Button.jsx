import PropTypes from "prop-types";

const variantMap = {
  primary:
    "btn btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300",
  secondary:
    "btn btn-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300",
  success:
    "btn btn-success focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-300",
  danger:
    "btn btn-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-300",
  ghost:
    "btn btn-ghost focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300",
};

const sizeMap = {
  sm: "text-xs px-3 py-1.5",
  md: "text-base px-5 py-3",
  lg: "text-lg px-6 py-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  icon,
  children,
  className = "",
  ...rest
}) {
  const base = variantMap[variant] || variantMap.primary;
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${base} ${sizeClass} rounded-xl font-semibold transition-all duration-200 ${disabled ? "cursor-not-allowed" : "hover:-translate-y-0.5"} ${className}`}
      {...rest}
    >
      {icon ? <span className="inline-flex items-center gap-2">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
