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
    <div className="overflow-x-auto">
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
                  <button
                    onClick={() => onToggle(problem._id)}
                    aria-label={solved ? 'Mark unsolved' : 'Mark solved'}
                    className={`h-4.5 w-4.5 rounded border transition-colors flex items-center justify-center ${
                      solved
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-gray-600 hover:border-sky-500'
                    }`}
                    style={{ height: '18px', width: '18px' }}
                  >
                    {solved && (
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-2.5 w-2.5"
                      >
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
                    <ResourceLink
                      href={problem.youtubeUrl}
                      icon={Youtube}
                      label="Watch on YouTube"
                    />
                    <ResourceLink
                      href={problem.leetcodeUrl}
                      icon={ExternalLink}
                      label="Open on LeetCode"
                    />
                    <ResourceLink
                      href={problem.articleUrl}
                      icon={BookOpen}
                      label="Read article"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;
