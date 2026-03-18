import ProgressBar from '../ui/ProgressBar';

const Sidebar = ({ topics = [], activeSlug, onSelectTopic, getTopicProgress }) => {
  return (
    <aside className="fixed top-14 left-0 bottom-0 w-72 bg-gray-950 border-r border-gray-800 overflow-y-auto z-20">
      <div className="px-3 py-4">
        <p className="px-2 mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Topics
        </p>
        <nav className="space-y-0.5">
          {topics.map((topic) => {
            const { solved, total } = getTopicProgress(topic._id);
            const isActive = activeSlug === topic.slug;
            const isComplete = total > 0 && solved === total;

            return (
              <button
                key={topic._id}
                onClick={() => onSelectTopic(topic.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-300'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-sm font-medium truncate ${
                      isActive ? 'text-sky-300' : 'text-gray-300 group-hover:text-gray-100'
                    }`}
                  >
                    {topic.name}
                  </span>
                  <span
                    className={`text-xs ml-2 shrink-0 ${
                      isComplete ? 'text-emerald-400 font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {solved}/{total}
                  </span>
                </div>
                <ProgressBar solved={solved} total={total} size="sm" showLabel={false} />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
