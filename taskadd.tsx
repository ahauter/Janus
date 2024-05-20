import React, {useState} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { Clock } from './clock';
import { Task, TimeBlock } from './dataTypes';

export default function AddTaskScreen() {
    const[name, setName] = useState("")
    const[category, setCategory] = useState("")
    const[dueData, set dueData] = useState("")
    return ( 
        <SafeAreaView style={styles.input}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />
            <TextInput style={styles.input} value={dueData} onChangeText={} />
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1
    },

});
