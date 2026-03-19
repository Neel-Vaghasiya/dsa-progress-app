import { Youtube, ExternalLink, BookOpen } from 'lucide-react';

const DIFF_STYLES = {
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

const ResourceLink = ({ href, icon: Icon, label }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="p-1.5 rounded text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
};

const CheckBox = ({ solved, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={solved ? 'Mark unsolved' : 'Mark solved'}
    className={`rounded border transition-colors flex items-center justify-center shrink-0 ${
      solved
        ? 'bg-emerald-500 border-emerald-500 text-white'
        : 'border-gray-600 hover:border-sky-500'
    }`}
    style={{ height: '18px', width: '18px' }}
  >
    {solved && (
      <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);

const ProblemCard = ({ problem, idx, solved, onToggle }) => (
  <div
    className={`p-3.5 border-b border-gray-800/60 transition-colors ${
      solved ? 'bg-emerald-500/[0.04]' : ''
    }`}
  >
    <div className="flex items-start gap-3">
      <CheckBox solved={solved} onToggle={() => onToggle(problem._id)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-600 tabular-nums">{idx + 1}.</span>
          <span
            className={`text-sm font-medium ${
              solved
                ? 'text-gray-500 line-through decoration-gray-600'
                : 'text-gray-200'
            }`}
          >
            {problem.title}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              DIFF_STYLES[problem.difficulty] ?? 'text-gray-400 bg-gray-400/10'
            }`}
          >
            {problem.difficulty}
          </span>
          <div className="flex items-center gap-0.5">
            <ResourceLink href={problem.youtubeUrl} icon={Youtube} label="YouTube" />
            <ResourceLink href={problem.leetcodeUrl} icon={ExternalLink} label="LeetCode" />
            <ResourceLink href={problem.articleUrl} icon={BookOpen} label="Article" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProblemTable = ({ problems = [], progress = {}, onToggle, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-600 text-sm">
        Loading problems…
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-600 text-sm">
        No problems found for this topic.
      </div>
    );
  }

  return (
    <>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-4 text-left w-10">Done</th>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Problem</th>
              <th className="py-3 px-4 text-left w-24">Difficulty</th>
              <th className="py-3 px-4 text-left w-32">Resources</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {problems.map((problem, idx) => {
              const solved = !!progress[problem._id];
              return (
                <tr
                  key={problem._id}
                  className={`group transition-colors ${
                    solved ? 'bg-emerald-500/[0.04]' : 'hover:bg-gray-800/40'
                  }`}
                >
                  <td className="py-3 px-4">
                    <CheckBox solved={solved} onToggle={() => onToggle(problem._id)} />
                  </td>
                  <td className="py-3 px-4 text-gray-600 tabular-nums">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-medium transition-colors ${
                        solved
                          ? 'text-gray-500 line-through decoration-gray-600'
                          : 'text-gray-200 group-hover:text-white'
                      }`}
                    >
                      {problem.title}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        DIFF_STYLES[problem.difficulty] ?? 'text-gray-400 bg-gray-400/10'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-0.5">
                      <ResourceLink href={problem.youtubeUrl} icon={Youtube} label="YouTube" />
                      <ResourceLink href={problem.leetcodeUrl} icon={ExternalLink} label="LeetCode" />
                      <ResourceLink href={problem.articleUrl} icon={BookOpen} label="Article" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden">
        {problems.map((problem, idx) => (
          <ProblemCard
            key={problem._id}
            problem={problem}
            idx={idx}
            solved={!!progress[problem._id]}
            onToggle={onToggle}
          />
        ))}
      </div>
    </>
  );
};

export default ProblemTable;
