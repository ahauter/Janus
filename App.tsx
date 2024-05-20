import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock } from './clock';
import { generateTimeBlocksForDay } from './utils';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const currentTimeBlocks = generateTimeBlocksForDay();
  return (
    <View style={styles.container}>
      <Clock timeBlocks={currentTimeBlocks} duration={1000 * 60 * 60 * 24} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Tasks')}
      >
        <Text style={styles.buttonText}>Tasks</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007BFF',
    padding: 7,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 13, // added to compensate for off-center clock so that "Tasks" button is centered
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
