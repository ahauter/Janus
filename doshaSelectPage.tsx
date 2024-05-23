import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StatusBarStyle, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Clock } from './clock';
import { DispatchContext } from './utils/dataStore';

export function DoshaSelect({ navigation }) {
    const dispatch = useContext(DispatchContext);
    if (dispatch === null) return
    return <View style={styles.container}>
        <StatusBar animated />
        <View style={styles.titleBox}>
            <Text style={styles.title}>Choose Your Dosha</Text>
            <Text style={styles.subtitle}>{'This will affect when we schedule your most important tasks.\nDon\'t worry you can always change this later'}</Text>
        </View>
        <TouchableOpacity
            onPress={() => {
                dispatch("SetDosha", { dosha: "vata" })
                navigation.navigate("Home")
            }}
            style={styles.Dosha1}>
            <View >
                <Text>Vata</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Dosha2}
            onPress={() => {
                dispatch("SetDosha", { dosha: "pitta" })
                navigation.navigate("Home")
            }} >
            <View >
                <Text>Pitta</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Dosha3}
            onPress={() => {
                dispatch("SetDosha", { dosha: "kapha" })
                navigation.navigate("Home")
            }} >
            <View >
                <Text>Kapha</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBar: {
        backgroundColor: '#98D369',
    },
    titleBox: {
        backgroundColor: '#98D369',
        paddingTop: 30,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 40,
        paddingBottom: 5,
        fontWeight: 'bold',
        alignContent: 'center'

    },
    subtitle: {
        fontSize: 15,
        color: '#FFF',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    Dosha1: {
        //flex: 2,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30,
        height: '20%',
    },
    Dosha2: {
        //flex: 3,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30,
        height: '20%',
    }, Dosha3: {
        //flex: 4,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30,
        height: '20%',
    },
});