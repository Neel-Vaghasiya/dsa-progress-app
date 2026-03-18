const variants = {
  primary: 'bg-sky-600 hover:bg-sky-500 text-white focus-visible:ring-sky-500',
  ghost: 'bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 focus-visible:ring-gray-500',
  danger: 'bg-red-900/40 hover:bg-red-900/60 text-red-300 border border-red-800 focus-visible:ring-red-500',
};

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}) => (
  <button
    {...props}
    disabled={isLoading || props.disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium
      transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${className}`}
  >
    {isLoading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);

export default Button;
