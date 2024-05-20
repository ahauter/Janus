import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StatusBarStyle, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
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
      <StatusBar/>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Choose Your Dosha</Text>
        <Text style={styles.subtitle}>{'This will affect when we schedule your most important tasks.\nDon\'t worry you can always change this later'}</Text>
      </View>
      <View style={styles.Dosha1}>
      <Image style={styles.Icon} source={require('./assets/Pitta.png')} />
        <View style={styles.BoxInternalR}>
          <Text>Vata</Text>
        </View>
      </View>
      <View style={styles.Dosha2}>
        <View style={styles.BoxInternalL}>
          <Text>Pitta</Text>
        </View>
        <Image style={styles.Icon} source={require('./assets/Pitta.png')} />
      </View>
      <View style={styles.Dosha3}>
      <Image style={styles.Icon} source={require('./assets/Pitta.png')} />
        <View style={styles.BoxInternalR}>
          <Text>Kapha</Text>
        </View>
      </View>
    </View>
  );
}
const colour='#FF7F50';
const barColour = '#DDD';
const styles = StyleSheet.create({
  
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar:{
    backgroundColor:colour,
  },
  titleBox:{
    backgroundColor:colour,
    marginTop:'-25%',
    paddingTop:40,
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
  DoshaTitle:{
    fontSize:25,
    fontWeight:'bold',
    color:'#000',
  },
  DoshaSubtitle:{
    fontSize:18,
    fontWeight:'bold',
    color:'#111',
  },
  Dosha1:{
    //flex: 2,
    marginTop:'15%',
    flexDirection: 'row',
    backgroundColor: barColour,
    alignItems: 'center',
    justifyContent:'flex-start',
    borderBottomLeftRadius:100,
    borderTopLeftRadius:100,
    margin:30,
    marginRight:0,
    marginLeft:70,
    height: '18%',
    width:'85%',
    paddingLeft:20,
  },
  Dosha2:{
    //flex: 3,
    backgroundColor: barColour,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopRightRadius:70,
    borderBottomRightRadius:70,
    paddingEnd:20,
    marginLeft:0,
    marginRight:60,
    width:'85%',
    height: '18%',
    paddingLeft:20,
    paddingRight:0,
  },Dosha3:{
    //flex: 4,
    flexDirection: 'row',
    backgroundColor: barColour,
    alignItems: 'center',
    justifyContent:'flex-start',
    borderBottomLeftRadius:100,
    borderTopLeftRadius:100,
    margin:30,
    marginRight:0,
    marginLeft:70,
    height: '18%',
    width:'85%',
    paddingLeft:20,
    marginBottom:'5%',
    
  },
  BoxInternalL:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'flex-start',
    width: '100%',
  },
  BoxInternalR:{
    flexDirection:'row-reverse',
    justifyContent:'center',
    alignContent:'flex-start',
    width: '100%',
  },
  Icon:{
    width: 100,
    height: 100,
    backgroundColor:colour,
    borderRadius:50,
  },
});
