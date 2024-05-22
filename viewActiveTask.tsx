import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { AppState, AppStateContext, DispatchContext, getActiveTask, migrateDatabase, useAppState } from './utils/dataStore';

export function ViewActiveTask({navigation}) {
  const state: AppState | null = useContext(AppStateContext);
  const screen_width = Dimensions.get('window').width * 0.9;
  if (state === null || state.activeTask === null) return;
  const activeTask = state.activeTask;
  return <View style={{ flexDirection: 'row', justifyContent: 'center', width: screen_width, marginTop: 60, backgroundColor: '#007BFF', borderRadius: 10, padding: 5 }}>
    <TouchableOpacity
      style={styles.buttonBottom}
    >
      <Text style={styles.smallText}>Current task</Text>
      <Text style={styles.smallText}>{activeTask.name}</Text>
    </TouchableOpacity>
    <Text>  |  </Text>
    <TouchableOpacity
      style={styles.buttonBottom}
      onPress={() => navigation.navigate('ViewTasks')}
    >
      <Text style={styles.smallText}>Timer</Text>
    </TouchableOpacity>
    <Text>  |  </Text>
    <TouchableOpacity
      style={styles.buttonBottom}
      onPress={() => navigation.navigate('ViewTasks')}
    >
      <Text style={styles.smallText}>Pause task</Text>
    </TouchableOpacity>
    <Text>  |  </Text>
    <TouchableOpacity
      style={styles.buttonBottom}
      onPress={() => navigation.navigate('ViewTasks')}
    >
      <Text style={styles.smallText}>Finish task</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F4E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8, // not sure why the clock isn't centered, so I have added this to compensate
  },
  settings: {
    backgroundColor: 'purple',
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    marginLeft: -10
  },
  taskButton: {
    backgroundColor: '#007BFF',
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
  },
  buttonBottom: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  smallText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF', // Apply white color to the icon
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeHeader: {
    backgroundColor: 'purple',
  },
  inactiveHeader: {
    backgroundColor: 'purple',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  content: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  accordion: {
    marginTop: 50,
  },
  contentText: {
    fontSize: 18,
  },
  linkText: {
    fontSize: 18,
    color: 'blue',
  },
});
