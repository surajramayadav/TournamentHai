
import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, ActivityIndicator, FlatList, Image, StyleSheet, YellowBox, StatusBar, LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewMoreText from 'react-native-view-more-text';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Header, Avatar, Divider, Tooltip, Badge, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Dot from 'react-native-vector-icons/Entypo';

const Home = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [Data, Setdata] = useState([])
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [dp, setdp] = useState('../assets/default.jpg')
  useEffect(() => {

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
              description: doc.data().description,
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
              three: doc.data().price3
            });
          });
          Setdata(list);

        })
       
  
    })

  }, [])


  const renderViewMore = (onPress) => {
    return (
      <Text style={{ color: '#808080', marginTop: 5 }} onPress={onPress}>View more</Text>
    )
  }
  const renderViewLess = (onPress) => {
    return (
      <Text style={{ color: '#808080', marginTop: 5 }} onPress={onPress}>View less</Text>
    )
  }
  return (
    <>
      <Header containerStyle={{ backgroundColor: 'white' }}
        leftComponent={<Dot name='camera' size={25} color='black' onPress={() => navigation.navigate('Upload')} />}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{name}</Text>}
        rightComponent={<Dot name='help' size={25} color='black' />}
      />
      <Divider />
   

        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={Data}
            renderItem={({ item }) =>
              <View>

                <View style={{ padding: 10 }}>
                  <Avatar size='small' activeOpacity={0.7} rounded source={{ uri: dp }} />
                </View>
                <View style={{ position: 'absolute', }}>
                  <Text style={{ fontSize: 15, marginTop: 10, paddingLeft: 55, fontWeight: 'bold' }}>{name}
                  <Text>  <Badge  value={item.sports} status="error" containerStyle={{}} /></Text></Text>
                  <Text style={{ fontSize: 13, paddingLeft: 55, }}>{item.Location}</Text>
                </View>
                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                  <Text style={{ marginTop: 5, paddingEnd: 10, fontSize: 12 }}>
                    {item.Tournament_date}</Text>
                </View>
              
  
                <View style={{ paddingLeft: 10 }}>
                  <ViewMoreText
                    numberOfLines={1}
                    renderViewMore={renderViewMore}
                    renderViewLess={renderViewLess}
                    textStyle={{ color: 'black', fontSize: 15 }}
                  >
                    <Text>
                      First Price {item.one}₹ ,Second Price {item.two}₹ Third Price {item.three}₹... 
                      Entry Fees for {item.sports} Tournament {item.Tournament_Name} is {item.entry_fees}₹ . {" "}
                      {item.description}
                    </Text>
                  </ViewMoreText>

                </View>
                <Divider />


                <View style={{ margin: 5, }} >
                  <Image source={{ uri: item.img_url }} style={{ width: 400, height: 300 }} PlaceholderContent={<ActivityIndicator />} />
                </View>
  <Text style={{alignSelf:'flex-end',fontSize:10,paddingEnd:10}}>{item.CreatedAt}</Text>
                
                <Divider />
              </View>
            }
            keyExtractor={(item) => item.id}
          />

        </View>
      

    </>


  );
};


export default Home;
