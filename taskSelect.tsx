import React, {useContext, useMemo, useState} from 'react';
import { View, Text, Button} from 'react-native';
import { Task } from './dataTypes';
import { prioritizeTasks } from './utils';
import { AppStateContext, AppState, AppDispatch, DispatchContext } from './utils/dataStore';

export function TaskSelection() {
  const state: AppState | null = useContext(AppStateContext);
  const dispatch: AppDispatch | null = useContext(DispatchContext);
  const [taskInd, setTaskInd] = useState<number>(0);
  if (state === null) return 
  if (dispatch === null) return 
  const {currentTasks} = state;
  const incompleteTasks = currentTasks.filter(t => !t.completed);
  const task = incompleteTasks[taskInd]; 
  const accept = async () => {
    dispatch("SetActive", {task: incompleteTasks[taskInd]})
  };
  const reject = () => {
    const newInd = (taskInd + 1) % incompleteTasks.length;
    setTaskInd(newInd);
  };
  if(task === undefined) return <View>
    <Text> 
      You don't have anything to do! 
      Try adding something
    </Text>
  </View>; 
  const durationStr = `${task.estimatedDuration.getHours()}h${task.estimatedDuration.getMinutes()}m`;
  return <View>
    <Text>{task.name}</Text>
    <Text>{durationStr}</Text>
    <Button title='Next Task' onPress={reject}/>
    <Button title='Accept Task' onPress={accept}/>
  </View>
}
