import React, { useEffect, useState } from 'react';
import {SafeAreaView,Text, StatusBar,} from 'react-native';
import { NavigationContainer, useIsFocused, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import Home from './Organizer/Home';
import Upload from './Organizer/Upload';
import Profile from './Organizer/Profile';
import UserHome from './User/UserHome';
import SearchOrginzer from './User/SearchOrginzer';
import UserProfile from './User/UserProfile';
import Aboutus from './AppComponent/AboutUs';
import Feedback from './AppComponent/Feedback';
import DrawerContent from './AppComponent/DrawerContent';
import Contactus from './AppComponent/ContactUs';
import Spalsh from './Components/SpalshScreen';
import LoginType from './Components/LoginType';
import UserRequest from './Organizer/UserRequest';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import UserActivity from './User/UserActivity';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function Organizer() {
  
  const[dp,setdp]=useState('../assets/default.jpg')
 const[bad,setbad]=useState()
  useEffect(()=>{
   
    AsyncStorage.getItem('Organizer').then((value) => {
      const data = JSON.parse(value)
      setdp(data.photoURL)
    })
       AsyncStorage.getItem('badge').then((value) => {
      const data = JSON.parse(value)
      setbad(value)
    }) 
    
   })
  return (
    <Tab.Navigator initialRouteName="Home"  tabBarOptions={{
      keyboardHidesTabBar: true, 
      activeTintColor: 'black',
      showLabel:false,
    
      
   }}  >
    <Tab.Screen name="Home" component={Home} 
    options={{
    
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={size} />
      ),
    }}
    />
    <Tab.Screen name="Upload" component={Upload} 
    options={{
      tabBarIcon: ({ color, size }) => (
        <Icon name="plus-circle" color={color} size={size} />
      ),
    }} 
    />
    <Tab.Screen name="UserRequest" component={UserRequest} 

    options={{
      
      tabBarIcon: ({ color, size }) => (
        <Icon name="heart" color={color} size={size} />
      ),
     
      tabBarBadge:!bad?(null):(bad)
      
    }} 
    />
    <Tab.Screen name="Profile" component={Profile}
    options={{
     
      tabBarIcon: ({ color, size }) => (
        <Avatar size={28} rounded source={{uri:dp}}/>
      ),
    }}
    />
  </Tab.Navigator>
  );
}

function User() {
  return (
    <Drawer.Navigator initialRouteName="UserHome" openByDefault={false}
    drawerContent={props=> <DrawerContent {...props}/>} drawerStyle={{
      backgroundColor: 'white',
      width: 220,}} >
        <Drawer.Screen name="UserActivity" component={UserActivity} />
        <Drawer.Screen name="Drawer" component={DrawerContent} />
        <Drawer.Screen name="UserHome" component={UserHome} />
        <Drawer.Screen name="SearchOrginzer" component={SearchOrginzer} />
        <Drawer.Screen name="Aboutus" component={Aboutus} />
        <Drawer.Screen name="Feedback" component={Feedback} />
        <Drawer.Screen name="Contactus" component={Contactus} />
        <Drawer.Screen name="UserProfile" component={UserProfile} />
      </Drawer.Navigator>
  );
}




const App=()=> {
  return (
    
      <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Spalsh" component={Spalsh} />
        <Stack.Screen name="LoginType" component={LoginType} />
        <Stack.Screen name="Organizer" component={Organizer} />
        <Stack.Screen name="User" component={User} />
        
      </Stack.Navigator>
    </NavigationContainer>
   
 
  );
};


export default App;
