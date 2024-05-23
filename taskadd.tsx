import React, { useState, useContext } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Task } from './dataTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Categories, Category } from './utils/categories';
import { AppDispatch, DispatchContext } from './utils/dataStore';
import * as Device from 'expo-device';

function saveTasks(
  dispatch: AppDispatch,
  navigation: any,
  name: string,
  length: Date,
  category: string,
  dueDate: Date,
  isEvent: boolean
) {
  if (name.length === 0) return
  const newTask: Task = {
    id: undefined,
    name: name,
    dueDate: dueDate,
    completed: false,
    category: category,
    isEvent: isEvent,
    estimatedDuration: length
  }
  dispatch("AddTask", { task: newTask })
  navigation.navigate('Home')
}

//@ts-ignore
export default function AddTaskScreen({ navigation }) {
  const dispatch = useContext(DispatchContext);
  const [name, setName] = useState("")
  const defLength = new Date()
  const isAndroid = Device.brand !== "Apple";
  defLength.setHours(0, 0, 0, 0)
  const [taskLength, setTaskLength] = useState(defLength)
  const [category, setCategory] = useState("")
  const [dueDate, setDueDate] = useState(new Date())
  const [isEvent, setIsEvent] = useState(false)
  const [showDurationPicker, setShowDurationPicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  if (dispatch === null) return
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scrollBar}>
        <Text style={styles.content}>Please add a task:</Text>
        <View>
          <View style={styles.taskView}>
            <TextInput style={styles.inputTask} value={name} onChangeText={setName} />
            <View>
              <View style={styles.taskView}>
                {isAndroid && <Button title="Select Duration" onPress={() => setShowDurationPicker(true)} />}
                {
                  (!isAndroid || showDurationPicker) && <DateTimePicker
                    value={taskLength}
                    mode="time"
                    locale='en_GB'
                    onChange={(_, date) => {
                      if (date) {
                        setTaskLength(date)
                        setShowDurationPicker(false)
                      }
                    }} />
                }
              </View>
            </View>
          </View>
        </View>
        <View style={styles.input}>
          {isAndroid && <Button title="Select Date" onPress={() => setShowDatePicker(true)} />}
          {
            (!isAndroid || showDatePicker) && <DateTimePicker
              value={dueDate}
              mode="date"
              onChange={(_, date) => { if (date) { setDueDate(date); setShowDatePicker(false) } }}
            />
          }
          <Text>   </Text>
          {isAndroid && <Button title="Select Time" onPress={() => setShowTimePicker(true)} />}
          {
            (!isAndroid || showTimePicker) && <DateTimePicker
              value={dueDate}
              mode="time"
              onChange={(_, date) => { if (date) { setDueDate(date); setShowTimePicker(false) } }}
            />
          }
        </View>
        <View style={styles.formGroup}>
          <CheckBox value={isEvent} onValueChange={setIsEvent} />
          <Text> Task can only happen at due date</Text>
        </View>
        <Text style={styles.content}>Select a category:</Text>
        <Picker
          selectedValue={category}
          prompt='Category'
          mode="dialog"
          onValueChange={(itemValue: string) =>
            setCategory(itemValue)
          }>
          {Categories.map(category => <Picker.Item key={category} value={category} label={category} />)}
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => saveTasks(dispatch, navigation, name, taskLength, category, dueDate, isEvent)}
        >
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F4E3',
    paddingTop: StatusBar.currentHeight,
    borderWidth: 1, 
    borderColor: '#F9F4E3',
    justifyContent: 'center',
  },
  scrollBar: {
    margin: 12,
    padding: 10,
    borderWidth: 1, 
    borderColor: '#F9F4E3',
  },
  safe: {
    backgroundColor: '#F9F4E3',
    height: '100%',
  },
  catPicker: {
    height: 20,
    margin: 0,
    padding: 10,
    borderWidth: 1
  },
  button: {
    width: 200, 
    padding: 10,
    backgroundColor: 'purple',
    marginLeft: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1, 
    borderColor: '#F9F4E3',
  },
  inputTask: {
    flexDirection: "row",
    height: 45,
    width: 140,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 10,
  },
  input: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 60,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F9F4E3',
  },
  formGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 30,
    marginLeft: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F9F4E3',
  },
  content: {  
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
