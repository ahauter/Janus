import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock } from './clock';
import { generateTimeBlocksForDay } from './utils';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const screen_width = Dimensions.get('window').width * 0.8;
  const currentTimeBlocks = generateTimeBlocksForDay();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 100, width: screen_width, justifyContent: 'space-between' }}>
        <TouchableOpacity 
          style={styles.taskButton} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.buttonText}>Placeholder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.taskButton} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.buttonText}>Add a task</Text>
        </TouchableOpacity>
      </View>
      <Clock timeBlocks={currentTimeBlocks} duration={1000 * 60 * 60 * 24} />
      <View style={{flexDirection: 'row', justifyContent: 'center', width: screen_width, marginTop: 60, backgroundColor: '#007BFF', borderRadius: 10, padding: 5 }}>
        <TouchableOpacity 
          style={styles.buttonBottom} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.smallText}>Current task</Text>
        </TouchableOpacity>
        <Text>  |  </Text>
        <TouchableOpacity 
          style={styles.buttonBottom} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.smallText}>Timer</Text>
        </TouchableOpacity>
        <Text>  |  </Text>
        <TouchableOpacity 
          style={styles.buttonBottom} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.smallText}>Pause task</Text>
        </TouchableOpacity>
        <Text>  |  </Text>
        <TouchableOpacity 
          style={styles.buttonBottom} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.smallText}>Finish task</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F4E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8, // not sure why the clock isn't centered, so I have added this to compensate
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
});
