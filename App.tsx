import React, { Suspense } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Clock } from './clock';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDatabase } from './utils/dataStore';
import { TimeBlock } from './dataTypes';
import { generateTimeBlocksForDay } from './utils';

//use 
// import { useSQLiteContext } from 'expo-sqlite';
// const db = useSQLiteContext(); 
// to get a reference of the database
export default function App() {
  const currentTimeBlocks = generateTimeBlocksForDay();
  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        <SQLiteProvider databaseName='janus.db' onInit={migrateDatabase} useSuspense>
          <Text>Open up App.tsx to start working on your app!</Text>
          <Text>Hello World</Text>
          <Clock timeBlocks={currentTimeBlocks} duration={0} />
          <StatusBar style="auto" />
        </SQLiteProvider >
      </Suspense>
    </View >
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
