
import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Header, Avatar, Divider, Tooltip, Button, Badge, Overlay, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Dot from 'react-native-vector-icons/Entypo';
import ViewMoreText from 'react-native-view-more-text';
const Profile = ({ navigation }) => {
  const [id, setid] = useState()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [dp, setdp] = useState('../assets/default.jpg')
  const [data, setdata] = useState([])
  const [user, setuser] = useState()
  const [posts, setpost] = useState()
  const [visible, setVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {


    AsyncStorage.getItem('Organizer').then((value) => {
      const data = JSON.parse(value)
      setname(data.displayName)
      setemail(data.email)
      setdp(data.photoURL)
      setuser(data)



    })
    AsyncStorage.getItem('Uid').then((id) => {

      firestore().collection("Posts")
        .where("id", "==", id)
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
              mainid: doc.data().id,
              CreatedAt: doc.data().CreatedAt.toDate().toDateString(),
              mainid: doc.data().id,
              one: doc.data().price1,
              two: doc.data().price2,
              three: doc.data().price3

            });
          });
          const post = list.length
          setpost(post)
          setdata(list);
          console.log(data)


        })


    });

  }, [])
  const singout = () => {
    auth()
      .signOut()
      .then(() => console.log('Orgnizer signed out!'));
    AsyncStorage.setItem('type', "")
    navigation.replace('LoginType')

  }
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
  const toggleOverlay = (id) => {
    setid(id)

    setVisible(!visible);
  };
  const Delete = () => {
    firestore().collection("Posts").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    })
    firestore().collection("Apply").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    })
    setVisible(!visible);

  }

  return (
    <>
      <Header containerStyle={{ backgroundColor: 'white' }}
        leftComponent={<Dot name='plus' size={25} color='black' onPress={() => navigation.navigate('Upload')} />}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{name}</Text>}
        rightComponent={<Icon name="log-out" size={25} color="black" onPress={singout} />}
      />
      <Divider />



      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ height: windowHeight / 4, width: 250 }}>
          <Dot onPress={toggleOverlay} style={{ position: 'absolute', alignSelf: 'flex-end' }} name="cross" size={40} color='black' />
          <View style={{ marginTop: 7 }}>
            <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold', }}>Options</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Divider />
          </View>
          <View style={{ marginTop: 15 }}>

            <Button title="Edit Post" type="clear"  />
          </View>
          <View style={{ marginTop: 10 }}>

            <Button title="Delete Post" type="clear" onPress={Delete} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Divider />

          </View>

        </View>
      </Overlay>





      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ padding: 10, }}>
            <Avatar size={100} activeOpacity={0.7} rounded source={{ uri: dp }} />
          </View>
          <View style={{ position: 'absolute', alignSelf: 'center', margin: 40 }}>
            <Text style={{ fontSize: 20, paddingLeft: 80 }}>Total Posts :- {posts}</Text>
          </View >
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 15, }}>{name} <Icon name="check-circle" size={15} color="blue" /></Text>
            <Text style={{ fontSize: 15, }}>{email}</Text>
          </View>
          <Text></Text>
        </View>
        <Divider />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <View>

                <View style={{ padding: 10 }}>
                  <Avatar size='small' activeOpacity={0.7} rounded source={{ uri: dp }} />
                </View>
                <View style={{ position: 'absolute', }}>
                  <Text style={{ fontSize: 15, marginTop: 10, paddingLeft: 55, fontWeight: 'bold' }}>{name}</Text>

                  <Text style={{ fontSize: 12, paddingLeft: 55, }}>{item.Location}</Text>
                </View>
                <View style={{ position: 'absolute', alignSelf: 'flex-end',paddingEnd:10 }}>
                  <TouchableOpacity onPress={() => toggleOverlay(item.id)}>
                  <Text style={{ marginTop: 15, fontSize: 12, }}>
                    {item.Tournament_date}   <Dot style={{  }} name="dots-three-vertical" color='black' size={20} /></Text>
                  </TouchableOpacity>
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
                <Text style={{ alignSelf: 'flex-end', fontSize: 12, paddingEnd: 10 }}>{item.CreatedAt}</Text>
                <Divider />
              </View>

            }
            keyExtractor={(item) => item.id}
          />

        </View>
      </ScrollView>

    </>


  );
};


export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'

  }
})