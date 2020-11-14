import React, { useEffect, useState } from 'react';
import { Text, Image, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Input, Button, Divider, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
const UserRequest = () => {
  const [data, setdata] = useState()
  useEffect(() => {
    AsyncStorage.getItem("Uid").then((value) => {
      firestore().collection("Apply")
        .where("Org_id", "==", value)
        .onSnapshot(function (snapshot) {
          const list = []
          snapshot.forEach(doc => {
            list.push({
              name: doc.data().name,
              no: doc.data().phoneNumber,
              dp: doc.data().dp,
              Tournament_Name: doc.data().Tournament_Name,
              id:doc.data().Post_id,
              CreatedAt:doc.data().CreatedAt.toDate().toDateString(),
            })
            setdata(list)

          });

        })
    })

  }, [])

  return (
    <>
      <Header containerStyle={{ backgroundColor: 'white' }}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> Applied Users </Text>}
      />
      <Divider/>
      <View style={{ backgroundColor: 'white' }}>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <View style={{ backgroundColor: 'white' }} >
              <Divider />
              <View style={{ padding: 10 }}>

                <Avatar size='medium' activeOpacity={0.7} rounded source={{ uri: item.dp }} />
              </View>
              <View style={{ position: 'absolute', }}>
                <Text style={{ fontSize: 15, marginTop: 15, paddingLeft: 80, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{paddingLeft: 80,}}>{item.Tournament_Name}</Text>
              </View>
              <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                <Text selectable selectionColor='#D0D5D8' style={{ marginTop: 15, paddingEnd: 20, fontSize: 15 }} >{item.no}</Text>
              </View>
            <View style={{ position: 'absolute', alignSelf: 'flex-end' }}> 
            <Text style={{marginTop:50,paddingEnd:10,fontSize:8}}>{item.CreatedAt}</Text>
              </View>
            </View>

          }
          keyExtractor={(item) => item.id}
        />

      </View>

    </>

  );
};


export default UserRequest;
