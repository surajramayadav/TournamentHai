
import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, ActivityIndicator, FlatList, Image, StyleSheet, YellowBox, StatusBar, LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Header, Avatar, Divider, Tooltip, Badge, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Dot from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';


const Home = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [arr, setarr] = useState([])
  const [Data, Setdata] = useState([])
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const[load,setload]=useState(false)
  const [dp, setdp] = useState('../assets/default.jpg')
  useEffect(() => {
    setload(true)
    AsyncStorage.getItem('Organizer').then((value) => {
      const data = JSON.parse(value)

      setname(data.displayName)
      setemail(data.email)
      setdp(data.photoURL)


    })

    AsyncStorage.setItem('type', "org")

    AsyncStorage.getItem('Organizer').then((value) => {
      const data = JSON.parse(value)
      firestore()
        .collection('Organizer')
        .doc(data.uid)
        .set({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          photoURL: data.photoURL,
          id: data.uid
        })
        .then(() => {
          console.log('Orgnizer added!');
        });

      firestore().collection("Posts")
        .where("id", "==", data.uid)
        
        .onSnapshot(function (snapshot) {

          const list = [];
          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              Tournament_Name: doc.data().Tournament_Name,
              Tournament_date: doc.data().Tournament_date.toDate().toDateString(),
              entry_fees: doc.data().entry_fees,
              img_url: doc.data().img_url,
              phone_no: doc.data().phone_no,
              sports: doc.data().sports,
              Location: doc.data().Location,
              teams: doc.data().Teams,
              CreatedAt: doc.data().CreatedAt.toDate().toDateString(),
              mainid: doc.data().id,
              one: doc.data().price1,
              two: doc.data().price2,
              three: doc.data().price3,
            
            });
          });
          const post = list.length
          setarr(post)
          Setdata(list);
          console.log(list)
          setload(false)
        })
       
  
    })
    

  }, [])


  const singout = () => {
    auth()
      .signOut()
      .then(() => console.log('Orgnizer signed out!'));
    AsyncStorage.setItem('type', "")
    navigation.replace('LoginType')

  }
  return (
    <>
      <Header containerStyle={{ backgroundColor: 'white' }}
        leftComponent={<Dot name='camera' size={25} color='black' onPress={() => navigation.navigate('Upload')} />}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{name}</Text>}
        
        rightComponent={load?( <ActivityIndicator animating={load} size='large' color="#ff0000" />):
        (<Icon name="log-out" size={25} color="black" onPress={singout} /> )
         }
        />
      <Divider />


   
{
  ! arr?(
      
    <View style={{  flex: 1, backgroundColor: 'white' , alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:20}}>No Post Uploaded</Text>
    </View>
  ):(
    
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={Data}
            renderItem={({ item }) =>
              <View>

                <View style={{ padding: 7 }}>
                  <Avatar size={50} activeOpacity={0.7} rounded source={{ uri: dp }} />
                </View>
                <View style={{ position: 'absolute', }}>
                  <Text style={{ fontSize: 15, marginTop: 10, paddingLeft: 70, fontWeight: 'bold' }}>{name}
                  </Text>
                  <Text style={{ fontSize: 13, paddingLeft: 70, }}>{item.Location}</Text>
                </View>
                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                  <Text style={{ marginTop: 5, paddingEnd: 10, fontSize: 15 }}>
                  ₹ {item.one}</Text>
                </View>
                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                  <Text style={{ marginTop: 30, paddingEnd:10, fontSize: 15,}}>
                    {item.sports}</Text>
                </View>
                <Divider/>
              
  
                <View style={{ paddingLeft: 10,marginTop:10 }}>
                 
                    <Text>
                      The {item.Tournament_Name} will be held on {item.Tournament_date} Total Teams Played {item.teams} . Entry Fees will be Rupees ₹{item.entry_fees} and First Price ₹{item.one}  Second Price ₹{item.two}  Third Price ₹{item.three}...
                    </Text>
                  

                </View>
                <Divider style={{marginTop:10}} />


                <View style={{ margin: 5, }} >
                  <Image source={{ uri: item.img_url }} style={{ width: "100%", height: 400 }}
                   PlaceholderContent={<ActivityIndicator  size='large' color="#ff0000" />} />
                </View>
  <Text style={{alignSelf:'flex-end',fontSize:10,paddingEnd:10}}>{item.CreatedAt}</Text>
                
                <Divider style={{marginTop:10}} />
              </View>
            }
            keyExtractor={(item) => item.id}
          />

        </View>
  )}
    </>


  );
};


export default Home;
