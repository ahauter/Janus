import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Clock } from './clock';
import { TimeBlock } from './dataTypes';
import AddTaskScreen from './taskadd';
const timeBlocks: TimeBlock[] = [
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T14:30Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  },
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T14:45Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  },
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T15:00Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  }
]
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Hello World</Text>
      <AddTaskScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
