import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Clock } from './clock';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDatabase } from './utils/dataStore';
import { TimeBlock } from './dataTypes';
import { generateTimeBlocksForDay } from './utils';
import AddTaskScreen from './taskadd';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import SettingsIcon from './assets/settings.png';
import Accordion from 'react-native-collapsible/Accordion';
import { Linking } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const screen_width = Dimensions.get('window').width * 0.9;
  const currentTimeBlocks = generateTimeBlocksForDay();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', position: 'absolute', top: 10, width: screen_width, justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={styles.settings}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image source={SettingsIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
      </View>
      <Clock timeBlocks={currentTimeBlocks} duration={1000 * 60 * 60 * 24} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: screen_width, marginTop: 60, backgroundColor: '#007BFF', borderRadius: 10, padding: 5 }}>
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
      <StatusBar barStyle="light-content" backgroundColor="black" />
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

function SettingsScreen() {
  const SECTIONS = [
    {
      title: 'About',
      content: 'Dosha Days helps you build your schedule and increase your productivity by organizing your day using time blocks, personalizing your daily schedule with tasks, categorizing tasks to help you stay focused, visualizing your schedule, breaking down tasks into manageable parts, and much more. With Dosha Days, you can procrastinate productively.',
    },
    {
      title: 'Contact information',
      content: 'For support, please contact the Dosha Days team on Discord: @haust, @John, @Hiccup, @briscuit.',
    },
    {
      title: 'Mental health hotlines',
      content: (
        <Text>
          If you need immediate help, please use this{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://www.apa.org/topics/crisis-hotlines')}>
            link
          </Text>{' '}
          to access crisis hotlines and resources.
        </Text>
      ),
    },
  ];

  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, _, isActive) => (
    <View style={[styles.header, isActive ? styles.activeHeader : styles.inactiveHeader]}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text style={styles.contentText}>{section.content}</Text>
    </View>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView contentContainerStyle={styles.accordion}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: '', headerTransparent: true }} />
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
