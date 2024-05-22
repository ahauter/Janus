import React, {useState, useMemo, useRef} from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button} from 'react-native';
import CheckBox from 'expo-checkbox';
import { Clock } from './clock';
import { Task, TimeBlock } from './dataTypes';
import {TaskStub} from './utils/generateTasks';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { HOUR, MINUTE } from './utils/duration';
import { Categories } from './utils/categories';

interface TaskStubDisplay {
  name: string;
  taskLength: Date;
}

interface TaskStubProps {
  name: string;
  setName: (name: string) => void;
  taskLength: Date;
  setTaskLength: (length: Date) => void;
  removeTask: (name: string) => void;
}

function newTaskStub(): TaskStubDisplay {
  const length = new Date();
  length.setHours(0,0,0,0);
  return {
    name: "",
    taskLength: length
  } 
}

function makeTaskStub(t: TaskStubDisplay): TaskStub {
  const lenStr = `${t.taskLength.getHours()}h${t.taskLength.getMinutes()}m`;
  return {
    name: t.name,
    estimatedLength: lenStr
  }
}

//We might want to test this..
function makeDistplayStub(t: TaskStub): TaskStubDisplay | null{
  const regex = /([0-9]*h)?([0-9]+m)/gm
  if(!regex.test(t.estimatedLength)){
    return null
  }
  const h_ind = t.estimatedLength.indexOf("h")
  const m_ind = t.estimatedLength.indexOf("m")
  let hours = 0
  let minutes = 0
  if (h_ind > 0) {
    const h_str = t.estimatedLength.substring(0, h_ind)
    try {
      hours = parseInt(h_str)
    } catch {
      return null
    }
  }
  const min_str = t.estimatedLength.substring(h_ind + 1, m_ind)
  try {
    minutes = parseInt(min_str)
  } catch {
    return null
  }
  const length = new Date();
  length.setHours(hours, minutes, 0,0)
  
  return {
    name: t.name,
    taskLength: length
  }
}

function DisplayTaskStub({name, setName, taskLength, setTaskLength, removeTask}:TaskStubProps) {
  let taskLengthInt = HOUR * taskLength.getHours() + MINUTE * taskLength.getMinutes();
  return <View>
    <View style={styles.taskView}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <View>
        {taskLengthInt > 15 * MINUTE && <View>
          <Button title="Split Up Task" onPress={() => {}}/>
        </View>}
        <View style={styles.taskView}>
          <DateTimePicker 
            value={taskLength} 
            mode="time"
            locale='en_GB'
            onChange={(_, date) => { if(date) setTaskLength(date) }} 
          />
          <Button title='Delete' onPress={() => removeTask(name)}/>
        </View>
      </View>
    </View>
  </View>
}

export default function AddTaskScreen() {
    const [taskStubs, setTaskStubs] = useState([newTaskStub()])
    const [taskOrderShown, setTaskOrderShow] = useState(false)
    const addTask = (t: TaskStubDisplay) => {
      const newTasks = [...taskStubs];
      newTasks.push(t);
      if(!taskOrderShown) {
        alert("Tasks at bottom must be completed after tasks at top!")
        setTaskOrderShow(true)
      }
      setTaskStubs(newTasks);
    }
    const removeTask = (name:string) => {
      const newTasks = [...taskStubs].filter(t => t.name !== name);
      if (newTasks.length === 0) {
        newTasks.push(newTaskStub())
      }
      setTaskStubs(newTasks);
    }
    const setTaskName = (task: TaskStubDisplay, newName: string) => {
      task.name = newName;
      //to update the ui 
      setTaskStubs([...taskStubs])
    } 
    const setTaskLength = (task: TaskStubDisplay, newLength: Date) => {
      task.taskLength = newLength;
      setTaskStubs([...taskStubs])
    } 
    const[category, setCategory] = useState("")
    const[dueDate, setDueDate] = useState(new Date())
    const[isEvent, setIsEvent] = useState(false)
    return (
        <SafeAreaView>
          <ScrollView style={styles.scrollBar}>
          <Text>Add a Task</Text>
          {taskStubs.map(ts => <View>
              <DisplayTaskStub 
               name={ts.name} taskLength={ts.taskLength} removeTask={removeTask}
               setName={n => setTaskName(ts, n)} setTaskLength={l => setTaskLength(ts, l)}
              />
            </View>)}
          <Button title='Add subtask' onPress={() => addTask(newTaskStub())}/>
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
          <Button title="Save" />
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
        height: 240, 
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
