import { useEffect, useState, useCallback, useMemo } from 'react';
import useTopics from '../hooks/useTopics';
import useProgress from '../hooks/useProgress';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import ProblemTable from '../components/ui/ProblemTable';
import ProgressBar from '../components/ui/ProgressBar';

const Dashboard = () => {
  const {
    topics,
    topicsLoading,
    problemsLoading,
    activeProblems,
    problemsCache,
    loadTopics,
    selectTopic,
  } = useTopics();

  const { progress, loadProgress, toggle } = useProgress();
  const [activeSlug, setActiveSlug] = useState('');

  useEffect(() => {
    loadTopics();
    loadProgress();
  }, [loadTopics, loadProgress]);

  useEffect(() => {
    if (topics.length > 0 && !activeSlug) {
      const firstSlug = topics[0].slug;
      setActiveSlug(firstSlug);
      selectTopic(firstSlug);
    }
  }, [topics, activeSlug, selectTopic]);

  const handleSelectTopic = useCallback(
    (slug) => {
      setActiveSlug(slug);
      selectTopic(slug);
    },
    [selectTopic]
  );

  const getTopicProgress = useCallback(
    (topicId) => {
      const topic = topics.find((t) => t._id === topicId);
      if (!topic) return { solved: 0, total: 0 };
      const cached = problemsCache[topic.slug];
      if (!cached) return { solved: 0, total: topic.problemCount ?? 0 };
      const solved = cached.filter((p) => progress[p._id]).length;
      return { solved, total: cached.length };
    },
    [topics, problemsCache, progress]
  );

  const overallSolved = useMemo(
    () => Object.values(progress).filter(Boolean).length,
    [progress]
  );

  const totalProblems = useMemo(
    () => topics.reduce((sum, t) => sum + (t.problemCount ?? 0), 0),
    [topics]
  );

  const activeTopic = topics.find((t) => t.slug === activeSlug);
  const activeTopicProgress = activeTopic ? getTopicProgress(activeTopic._id) : null;

  if (topicsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-600 text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar solved={overallSolved} total={totalProblems} />

      <Sidebar
        topics={topics}
        activeSlug={activeSlug}
        onSelectTopic={handleSelectTopic}
        getTopicProgress={getTopicProgress}
      />

      <main className="pl-72 pt-14 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {activeTopic && (
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-100 mb-1">
                {activeTopic.name}
              </h1>
              {activeTopic.description && (
                <p className="text-sm text-gray-500 mb-3">{activeTopic.description}</p>
              )}
              {activeTopicProgress && (
                <div className="w-64">
                  <ProgressBar
                    solved={activeTopicProgress.solved}
                    total={activeTopicProgress.total}
                  />
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden">
            <ProblemTable
              problems={activeProblems}
              progress={progress}
              onToggle={toggle}
              isLoading={problemsLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
