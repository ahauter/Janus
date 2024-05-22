import React, {useState} from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button} from 'react-native';
import CheckBox from 'expo-checkbox';
import { Task } from './dataTypes';
import {TaskStub} from './utils/generateTasks';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { HOUR, MINUTE } from './utils/duration';
import { Categories, Category } from './utils/categories';
import { addTask } from './utils/dataStore';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';

function saveTasks(
  navigation: any,
  db: SQLiteDatabase,
  name: string,
  length: Date,
  category: string,
  dueDate: Date,
  isEvent: boolean
) {
  if(name.length === 0) return
  const newTask: Task = {
    id: undefined,
    name: name,
    dueDate: dueDate,
    completed: false,
    category: category,
    isEvent: isEvent,
    estimatedDuration: length
  }
  addTask(db, newTask)
  navigation.navigate('Home')
}

//@ts-ignore
export default function AddTaskScreen({navigation}) {
    const [name, setName] = useState("")
    const defLength = new Date()
    defLength.setHours(0,0,0,0)
    const [taskLength, setTaskLength] = useState(defLength)
    const[category, setCategory] = useState("")
    const[dueDate, setDueDate] = useState(new Date())
    const[isEvent, setIsEvent] = useState(false)
    const db = useSQLiteContext();
    //TODO make the tasks drag and dropable
    return (
        <SafeAreaView>
          <ScrollView style={styles.scrollBar}>
          <Text>Add a Task</Text>
          <View>
            <View style={styles.taskView}>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
              <View>
                <View style={styles.taskView}>
                  <DateTimePicker 
                    value={taskLength} 
                    mode="time"
                    locale='en_GB'
                    onChange={(_, date) => { if(date) setTaskLength(date) }} 
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.input}>
            <DateTimePicker
              value={dueDate} 
              mode="date"
              onChange={(_, date) => { if(date) setDueDate(date) }} 
            />
            <DateTimePicker
              value={dueDate} 
              mode="time"
              onChange={(_, date) => { if(date) setDueDate(date) }} 
            />
          </View>
          <View style={styles.formGroup}>
            <CheckBox  value={isEvent} onValueChange={setIsEvent}/>
            <Text>Task can only happen at due date</Text>
          </View>
          <Text>Category</Text>
          <Picker
            selectedValue={category}
            prompt='Category'
            mode="dialog"
            onValueChange={(itemValue: string) => 
              setCategory(itemValue)
          }>
            {Categories.map(category => <Picker.Item key={category} value={category} label={category} />)}
          </Picker>
          <Button title="Save" onPress={()=>saveTasks(navigation, db, name, taskLength, category, dueDate, isEvent)} />
          </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        borderWidth: 1
    },
    scrollBar: {
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    catPicker: {
        height: 20, 
        margin: 0,
        padding: 10,
        borderWidth: 1
    },
    taskView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
        borderWidth: 1
    },
    input: {
        flexDirection: "row",
        height: 60, 
        width: 200, 
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    formGroup: {
        flexDirection: "row",
        height: 60, 
        margin: 12,
        borderWidth: 1
    },
});
