
import React, { useEffect, useState } from 'react';
import { Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Card, Header, Avatar, Divider, Tooltip, Button, Badge, SearchBar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
const DrawerContent = ({navigation}) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [dp, setdp] = useState('../assets/default.jpg')
useEffect(()=>{
    AsyncStorage.getItem('User').then((value) => {
        const data = JSON.parse(value)

        setname(data.displayName)
        setemail(data.email)
        setdp(data.photoURL)
  
        })
},[])
    
  const singout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    AsyncStorage.setItem('type', "")
    navigation.replace('LoginType')

  }
    return (
        <SafeAreaView style={{ flex: 1,}}>
        
            <ScrollView>
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{ alignSelf: 'center', marginTop: 80 }}>
                    <Avatar rounded size={110} source={{ uri: dp, }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
    <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: 'bold' }}>{email}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Divider />
                </View>
                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UserHome')}> 
                    <Icon style={{paddingLeft:10}} name="home" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15,}}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('SearchOrginzer')}>
                    <Icon style={{paddingLeft:10}} name="search" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15,}}>Search Orginzer</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('UserActivity')}>
                    <Icon style={{paddingLeft:10}} name="activity" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15}}>My Activity</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Aboutus')}>
                    <Icon style={{paddingLeft:10}} name="info" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15}}>About Us</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Feedback')}>
                    <Icon style={{paddingLeft:10}} name="message-circle" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15}}>Feedback</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Contactus')}>
                    <Icon style={{paddingLeft:10}} name="phone" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15}}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Divider />
                </View>

                <View style={{marginTop:15}}>
                    <TouchableOpacity onPress={singout}>
                    <Icon style={{paddingLeft:10}} name="log-out" size={20} color='black'/>
                    <Text style={{position:'absolute',paddingLeft:40,fontSize:15,}}>Logout</Text>
                    </TouchableOpacity>
                </View>
             
            </View>
            </ScrollView>

        </SafeAreaView>
    );
};


export default DrawerContent;
