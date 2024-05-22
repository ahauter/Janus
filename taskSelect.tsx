import React from 'react';
import { View, Text, Button} from 'react-native';
import { Task } from './dataTypes';

interface TaskSelectionProps {
  task: Task;
  accept: () => void;
  reject: () => void;
}

export function TaskSelection({task, accept, reject}: TaskSelectionProps) {
  const durationStr = `${task.estimatedDuration.getHours()}h${task.estimatedDuration.getMinutes()}m`;
  return <View>
    <Text>{task.name}</Text>
    <Text>{durationStr}</Text>
    <Button title='Next Task' onPress={reject}/>
    <Button title='Accept Task' onPress={accept}/>
  </View>
}
