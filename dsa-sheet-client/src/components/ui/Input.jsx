const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-300">{label}</label>
    )}
    <input
      {...props}
      className={`w-full rounded-lg border bg-gray-900 px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500
        outline-none transition-colors
        focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        ${error ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'}`}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

export default Input;
