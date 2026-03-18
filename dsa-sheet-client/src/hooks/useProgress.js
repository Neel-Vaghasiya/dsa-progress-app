import { useState, useCallback } from 'react';
import * as progressService from '../services/progressService';

const useProgress = () => {
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await progressService.getAllProgress();
      const map = {};
      data.data.forEach(({ problemId, isSolved }) => {
        map[problemId] = isSolved;
      });
      setProgress(map);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggle = useCallback(async (problemId) => {
    const previous = progress[problemId] ?? false;
    setProgress((prev) => ({ ...prev, [problemId]: !previous }));

    try {
      const { data } = await progressService.toggleProgress(problemId);
      setProgress((prev) => ({ ...prev, [problemId]: data.data.isSolved }));
    } catch {
      setProgress((prev) => ({ ...prev, [problemId]: previous }));
    }
  }, [progress]);

  const getTopicProgress = useCallback(
    (problems = []) => {
      const total = problems.length;
      const solved = problems.filter((p) => progress[p._id]).length;
      return { solved, total };
    },
    [progress]
  );

  const getOverallProgress = useCallback(
    (allProblems = []) => {
      const total = allProblems.length;
      const solved = allProblems.filter((p) => progress[p._id]).length;
      return { solved, total };
    },
    [progress]
  );

  return { progress, isLoading, loadProgress, toggle, getTopicProgress, getOverallProgress };
};

export default useProgress;
