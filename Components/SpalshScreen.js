import React, { useEffect, useState } from 'react';
import {Text,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Spalsh=({navigation})=> {
 

  setTimeout(() => {
    AsyncStorage.getItem('type').then((value) =>
    {
       if(value=='org')
       {
        navigation.replace('Organizer')
         }
         else if(value=='user'){
          navigation.replace('User')
         }
       else{
        navigation.replace('LoginType')
       }
    })
    
    
    
  }, 3000);
  return (
   <SafeAreaView style={{ flex: 1,backgroundColor:'white'}}>
      <View style={{ flex: 1,marginTop:100, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView source={require('../assets/7070-cheer-for-team-india.json')} autoPlay loop  />
        </View >
         <View style={{ flex: 1, alignItems:'center',marginTop:100}}>
        <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}> Chalo Tournament Hai !!!</Text>
        </View>
        </SafeAreaView>
  );
};


export default Spalsh;
