import { useState, useCallback } from 'react';
import * as topicService from '../services/topicService';

const useTopics = () => {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);

  const [problemsCache, setProblemsCache] = useState({});
  const [problemsLoading, setProblemsLoading] = useState(false);
  const [activeProblems, setActiveProblems] = useState([]);

  const loadTopics = useCallback(async () => {
    setTopicsLoading(true);
    try {
      const { data } = await topicService.getTopics();
      setTopics(data.data);
    } finally {
      setTopicsLoading(false);
    }
  }, []);

  const selectTopic = useCallback(
    async (slug) => {
      if (problemsCache[slug]) {
        setActiveProblems(problemsCache[slug]);
        return;
      }

      setProblemsLoading(true);
      try {
        const { data } = await topicService.getProblemsByTopic(slug);
        const problems = data.data;
        setProblemsCache((c) => ({ ...c, [slug]: problems }));
        setActiveProblems(problems);
      } finally {
        setProblemsLoading(false);
      }
    },
    [problemsCache]
  );

  return {
    topics,
    topicsLoading,
    problemsLoading,
    activeProblems,
    problemsCache,
    loadTopics,
    selectTopic,
  };
};

export default useTopics;
