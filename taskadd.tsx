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
    <SafeAreaView>
      <ScrollView style={styles.scrollBar}>
        <Text>Add a Task</Text>
        <View>
          <View style={styles.taskView}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <View>
              <View style={styles.taskView}>
                {isAndroid && <Button title="Select Duration" onPress={() => setShowDurationPicker(true)} />}
                {
                  !isAndroid || showDurationPicker && <DateTimePicker
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
            !isAndroid || showDatePicker && <DateTimePicker
              value={dueDate}
              mode="date"
              onChange={(_, date) => { if (date) { setDueDate(date); setShowDatePicker(false) } }}
            />
          }
          {isAndroid && <Button title="Select Time" onPress={() => setShowTimePicker(true)} />}
          {
            !isAndroid || showTimePicker && <DateTimePicker
              value={dueDate}
              mode="time"
              onChange={(_, date) => { if (date) { setDueDate(date); setShowTimePicker(false) } }}
            />
          }
        </View>
        <View style={styles.formGroup}>
          <CheckBox value={isEvent} onValueChange={setIsEvent} />
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
        <Button title="Save" onPress={() => saveTasks(
          dispatch, navigation, name, taskLength, category, dueDate, isEvent)} />
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
