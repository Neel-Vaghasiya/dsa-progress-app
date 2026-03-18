const ProgressBar = ({ solved = 0, total = 0, showLabel = true, size = 'md' }) => {
  const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

  const barHeight = size === 'sm' ? 'h-1' : 'h-2';

  const color =
    pct === 100
      ? 'bg-emerald-500'
      : pct >= 50
      ? 'bg-sky-500'
      : 'bg-sky-600';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
          <span>
            <span className="text-gray-200 font-medium">{solved}</span> / {total}
          </span>
          <span>{pct}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-800 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className={`${barHeight} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
