import React, { useEffect } from 'react';
import { Dimensions, View, } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,GoogleSigninButton } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Input, Button,Text, Divider, Card} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
const LoginType = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '821143733103-8kjkqju4smhtodma8i9chghs2cr7lj1a.apps.googleusercontent.com',
    });
  }, [])
  
  async function OrgLogin() {
    try {
      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(credential);
      AsyncStorage.setItem('Uid', firebaseUserCredential.user.toJSON().uid)
      const jsonValue = JSON.stringify(firebaseUserCredential.user.toJSON())
      AsyncStorage.setItem('Organizer', jsonValue)
      navigation.replace('Organizer')
    } catch (e) {
      console.error(e);
    }
  }
  async function  UserLogin() {
    try {
      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(credential);
      const jsonValue = JSON.stringify(firebaseUserCredential.user.toJSON())
      AsyncStorage.setItem('Uid', firebaseUserCredential.user.toJSON().uid)
      AsyncStorage.setItem('User', jsonValue)
      navigation.replace('User')
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <LottieView source={require('../assets/17363-trophy-success.json')} autoPlay loop />

      </View >
     
      <Animatable.View style={{ flex: 1.6, backgroundColor: 'white' }} animation="tada" >
     
       <Text style={{alignSelf:'center',fontSize:25,fontWeight:'bold'}}>Tournament Hai</Text>
       <Card>
       <Text style={{marginTop:5,fontSize:20,alignSelf:'center'}}>Login As Player </Text>
       <Divider style={{marginTop:10}}/>
         <Button containerStyle={{marginTop:20}} icon={<Icon name='google' size={20} color='blue'/>} 
         onPress={UserLogin} title='   Singin With Google'  type='outline'/>
      
       </Card>
       <Text style={{marginTop:10,fontSize:30,alignSelf:'center'}} >OR</Text>
      <Card>
      <Text style={{marginTop:5,fontSize:20,alignSelf:'center'}}>Login As Organizer </Text>
      <Divider style={{marginTop:10}}/>
      <Button containerStyle={{marginTop:20}} icon={<Icon name='google' size={20} color='blue'/>}  title='   Singin With Google'  type='outline'
      onPress={OrgLogin}/>
      
      </Card>
      </Animatable.View>
    


    </>
  );
};


export default LoginType;
