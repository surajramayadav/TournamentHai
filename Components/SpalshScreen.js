import React, { useEffect, useState } from 'react';
import {Text,Image,View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Spalsh=({navigation})=> {
 
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
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
   <SafeAreaView style={{ backgroundColor:'white'}}>
      <View style={{ flex: 1,marginTop:windowHeight/3, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/trophy.png')} style={{width:'25%',height:100}}  />
        </View >
         <View style={{ flex: 1, alignItems:'center',marginTop:windowHeight/3}}>
        <Text style={{fontSize:30,color:'black',fontWeight:'bold'}}> Tournament </Text>
        </View>
        </SafeAreaView>
  );
};


export default Spalsh;
