import React, { useContext, useMemo, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from './dataTypes';
import { prioritizeTasks } from './utils';
import { AppStateContext, AppState, AppDispatch, DispatchContext } from './utils/dataStore';

export function TaskSelection() {
  const state: AppState | null = useContext(AppStateContext);
  const dispatch: AppDispatch | null = useContext(DispatchContext);
  const [taskInd, setTaskInd] = useState<number>(0);
  if (state === null || state.dosha === "") return
  if (dispatch === null) return
  const { currentTasks } = state;
  const incompleteTasks = prioritizeTasks(currentTasks.filter(t => !t.completed), state.dosha);
  const task = incompleteTasks[taskInd];
  const accept = async () => {
    dispatch("SetActive", { task: incompleteTasks[taskInd] })
  };
  const reject = () => {
    const newInd = (taskInd + 1) % incompleteTasks.length;
    setTaskInd(newInd);
  };
  if (task === undefined) return
  <View>
    <Text>
      You don't have anything to do!
      Try adding something
    </Text>
  </View>;
  const durationStr = `${task.estimatedDuration.getHours()}h${task.estimatedDuration.getMinutes()}m`;
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{task.name}</Text>
      <Text style={styles.time}>{durationStr}</Text>
      <Text> </Text>
      <TouchableOpacity style={styles.button} onPress={reject}>
        <Text style={styles.buttonText}>Next task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={accept}>
        <Text style={styles.buttonText}>Accept task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 110,
    backgroundColor: '#007BFF',
    borderRadius: 10, 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    fontSize: 20,
    justifyContent: 'center',
    marginTop: 10,
  },
  time: {
    fontSize: 16,
    justifyContent: 'center',
    marginTop: 10,
  },
});

