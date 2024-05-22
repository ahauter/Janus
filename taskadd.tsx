import React, {useState, useMemo, useRef} from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import CheckBox from 'expo-checkbox';
import { Clock } from './clock';
import { Task, TimeBlock } from './dataTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { HOUR, MINUTE } from './utils/duration';
import { CATEGORIES_TO_COLORS, Categories } from './utils/categories';

const DurationPickerStyles = StyleSheet.create({
  container: { 
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  picker: {
    display: "flex",
    width: 5,
    height: 4,
    padding: 4
  }
});

export default function AddTaskScreen() {
    const[name, setName] = useState("")
    const[category, setCategory] = useState("")
    const[dueDate, setDueDate] = useState(new Date())
    const defaultDuration = new Date()
    defaultDuration.setHours(0,0,0,0)
    const[taskLength, setTaskLength] = useState(defaultDuration);
    let taskLengthInt = 0;
    useMemo(()=>{
      taskLengthInt = HOUR * taskLength.getHours() + MINUTE * taskLength.getMinutes();
    }, [taskLength])
    return (
        <SafeAreaView>
          <Text>Add a Task</Text>
          <Text>Name / Time</Text>
          <View style={styles.input}>
            <TextInput  value={name} onChangeText={setName} />
            <DateTimePicker 
              value={taskLength} 
              mode="time"
              locale='en_GB'
              onChange={(_, date) => { if(date) setTaskLength(date) }} 
            />
          </View>
          {taskLengthInt > 15 * MINUTE && <View>
            <Button title="Split Up Task" onPress={() => {}}/>
          </View>}
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
            <CheckBox />
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
          
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    },
    catPicker: {
        height: 40, 
        margin: 0,
        padding: 10,
        borderWidth: 1
    },
    input: {
        flexDirection: "row",
        height: 60, 
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    formGroup: {
        flexDirection: "row",
        height: 60, 
        margin: 12,
    },
});
