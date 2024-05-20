import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StatusBarStyle, StyleSheet, Text, View, Image } from 'react-native';
import { Clock } from './clock';
import { TimeBlock } from './dataTypes';
const timeBlocks: TimeBlock[] = [
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T14:30Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  },
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T14:45Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  },
  {
    duration: 15 * 1000 * 60,
    startTime: new Date("2024-05-18T15:00Z"),
    tasks: [],
    category: "work",
    subTimeBlocks: []
  }
]
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style={styles.navBar} animated/>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Choose Your Dosha</Text>
        <Text style={styles.subtitle}>{'This will affect when we schedule your most important tasks.\nDon\'t worry you can always change this later'}</Text>
      </View>
      <View style={styles.Dosha1}>
        <Text>Vata</Text>
      </View>
      <View style={styles.Dosha2}>
        <Text>Pitta</Text>
        <Image style={styles.Icon} source={require('./assets/Pitta.png')} />
      </View>
      <View style={styles.Dosha3}>
        <Text >Kapha</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar:{
    backgroundColor:'#98D369',
  },
  titleBox:{
    backgroundColor:'#98D369',
    paddingTop:30,
    marginHorizontal:10,
    paddingHorizontal:10,
    width: '100%',
    height:150,
    justifyContent: 'flex-start',
    alignItems:'center',

  },
  title:{
    fontSize: 40,
    paddingBottom:5,
    fontWeight: 'bold',
    alignContent: 'center'

  },
  subtitle:{
    fontSize:15,
    color: '#FFF',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  Dosha1:{
    //flex: 2,
    backgroundColor:'#ddd',
    alignItems: 'center',
    justifyContent:'flex-end',
    borderBottomLeftRadius:100,
    borderTopLeftRadius:100,
    margin:30,
    marginRight:0,
    width:'85%',
    marginLeft:70,
    height: '18%',
  },
  Dosha2:{
    //flex: 3,
    backgroundColor:'#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius:70,
    borderBottomRightRadius:70,
    marginLeft:0,
    marginRight:60,
    width:'85%',
    height: '18%',
    paddingLeft:20,
    paddingRight:0,
  },Dosha3:{
    //flex: 4,
    backgroundColor:'#ddd',
    alignItems: 'center',
    justifyContent:'flex-end',
    borderBottomLeftRadius:100,
    borderTopLeftRadius:100,
    margin:30,
    marginRight:0,
    marginLeft:70,
    height: '18%',
    width:'85%',
    flexDirection: 'row',
    paddingRight:20,
    marginBottom:'20%',
    
  },
  Icon:{
    width: 100,
    height: 100,
  },
});
