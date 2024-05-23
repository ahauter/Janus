import React, { useContext } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import FireIcon from './assets/fire.png'; 
import WindIcon from './assets/wind.png'; 
import EarthIcon from './assets/earth.png'; 

import { DispatchContext } from './utils/dataStore';

export function DoshaSelect({ navigation }) {
    const dispatch = useContext(DispatchContext);
    if (dispatch === null) return null;

    return (
    <View style={styles.main}>
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View style={styles.titleBox}>
                <Text style={styles.title}>Choose your dosha</Text>
                <Text style={styles.subtitle}>
                    This will affect when we schedule your most important tasks.
                    {'\n'}Don't worry! You can always change this later.
                </Text>
            </View>
        </View>

        <View style={styles.container1}>
            <TouchableOpacity
                onPress={() => {
                    dispatch("SetDosha", { dosha: "vata" });
                    navigation.navigate("Home");
                }}
                style={styles.doshaContainer1}
            >
                <Image source={WindIcon} style={styles.doshaImage} />
                <Text style={styles.name}>Vata</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container2}>
            <TouchableOpacity
                onPress={() => {
                    dispatch("SetDosha", { dosha: "pitta" });
                    navigation.navigate("Home");
                }}
                style={styles.doshaContainer2}
            >
                <Image source={FireIcon} style={styles.doshaImage} />
                <Text style={styles.name}>Pitta</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container3}>
            <TouchableOpacity
                onPress={() => {
                    dispatch("SetDosha", { dosha: "kapha" });
                    navigation.navigate("Home");
                }}
                style={styles.doshaContainer3}
            >
                <Image source={EarthIcon} style={styles.doshaImage} />
                <Text style={styles.name}>Kapha</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    container3: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
    },
    titleBox: {
        backgroundColor: '#F68C45',
        paddingTop: 30,
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    doshaContainer1: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50, 
        marginVertical: 20,
        paddingHorizontal: 20,
        width: '70%',
        height: 120,
    },
    doshaContainer2: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50, 
        marginVertical: 20,
        paddingHorizontal: 20,
        width: '70%',
        height: 120,
    },
    doshaContainer3: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,         
        marginVertical: 20,
        paddingHorizontal: 20,
        width: '70%',
        height: 120,
    },
    doshaImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
    },
});

export default DoshaSelect;
