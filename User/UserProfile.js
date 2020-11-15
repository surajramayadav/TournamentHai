import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, Button, FlatList, ScrollView, ActivityIndicator, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import Dot from 'react-native-vector-icons/Entypo';
import ViewMoreText from 'react-native-view-more-text';
import { Card, Header, Avatar, Divider, Tooltip, Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const UserProfile = ({ route, navigation }) => {

  const { id } = route.params;
  const[load,setload]=useState(false)
  const [uid, setuid] = useState()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [dp, setdp] = useState('../assets/default.jpg')
  const [data, setdata] = useState()
  const [posts, setpost] = useState()

  useLayoutEffect(() => {
    setload(true)
    console.log("first")



    console.log("profile  " + id)
    firestore().collection("Organizer")
      .where("id", "==", id)
      .onSnapshot(function (snapshot) {
        snapshot.forEach(doc => {
          setname(doc.data().displayName)
          setemail(doc.data().email)
          setdp(doc.data().photoURL)

        });
      })
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
        setload(false)

      })
  }, [id])




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
        leftComponent={<Icon name='arrow-left' size={25} color='black' onPress={() => navigation.goBack()} />}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{name}</Text>}
        rightComponent={ <ActivityIndicator animating={load} size='large' color="#ff0000" />
        }
      />
<Divider/>
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
       


            


                <View style={{ margin:5 }} >
                  <Image source={{ uri: item.img_url }} style={{ marginTop:10, width: "100%", height:300 }} PlaceholderContent={<ActivityIndicator />} />
                </View>
                <Text style={{alignSelf:'flex-end',fontSize:12,paddingEnd:10}}>{item.CreatedAt}</Text>
  
                <Divider style={{marginTop:10}} />

              </View>

            }
            keyExtractor={(item) => item.id}
          />

        </View>
      </ScrollView>

    </>


  );
};


export default UserProfile;
