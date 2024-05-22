import React, {useContext, useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import { AppStateContext } from './utils/dataStore';
import { Task } from './dataTypes';

interface TaskViewProps {
  task: Task
}

function TaskView({
  task
}: TaskViewProps) {
  const durText = `${task.estimatedDuration.getHours()}h ${task.estimatedDuration.getMinutes()}m`
  return <View>
    <Text>{task.name}</Text>
    <Text>{durText}</Text>
  </View> 
}

export function TaskList({ navigator }) {
  const state = useContext(AppStateContext);
  if(state === null) return
  const {currentTasks: tasks} = state;
  return <SafeAreaProvider>
    <ScrollView>
      {tasks.map(t => <TaskView key={t.name} task={t}/>)}      
    </ScrollView>
  </SafeAreaProvider>  
}
