import React, { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Task } from '../dataTypes';
import { getAllIncompleteTasks } from './dataStore';

export function useCurrentTasks() {
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const db = useSQLiteContext();
  const refresh = () => {
    if (loading) return;
    setLoading(true);
    getAllIncompleteTasks(db)
      .then(newTasks => {
        setCurrentTasks(newTasks)
        setLoading(false)
      }).catch(() => setLoading(false));
  }
  useEffect(refresh, [setCurrentTasks, loading]);
  return { currentTasks, refresh }
}
