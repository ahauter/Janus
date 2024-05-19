import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Clock } from './clock';
import { generateTimeBlocksForDay } from './utils';

export default function App() {
  const currentTimeBlocks = generateTimeBlocksForDay();
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Clock timeBlocks={currentTimeBlocks} duration={1000 * 60 * 60 * 24} />
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
