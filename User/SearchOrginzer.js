
import React, { useEffect, useState } from 'react';
import { Text, View, } from 'react-native';
import { Card, Header, Avatar, Divider, Tooltip, Button, Badge, SearchBar, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
const SearchOrginzer = ({ navigation }) => {
  const [search, setsearch] = useState()
  const [text,settext]=useState()
  const [arr,setarr]=useState([])
  useEffect(() => {
    firestore().collection("Organizer")
      .onSnapshot(function (snapshot) {
        const list = [];
        snapshot.forEach(doc => {

          list.push({
            id: doc.data().id,
            name: doc.data().displayName,
            email: doc.data().email,
            dp: doc.data().photoURL,
          });
        });

        setsearch(list);
        setarr(list)
       console.log(search)


      })


  }, [])
  
const searchData=(text) =>{
    const newData = arr.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
     setsearch(newData)
      settext(text) 
    
  }
  const handleprofile = (item) => {
 
  console.log("search    "+item)
    navigation.navigate('UserProfile',{id:item})
  }

  return (
    <>
      <Header containerStyle={{backgroundColor:'white'}}
        leftComponent={<Icon name='arrow-left' size={25} color='black' onPress={() => navigation.goBack()} />}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> Search Orgnizer </Text>}

      />
      <Divider/>
      <SearchBar containerStyle={{ backgroundColor: 'white', borderBottomColor: 'white', borderTopColor: 'white' }} inputContainerStyle={{ backgroundColor: 'white' }}
        placeholder="Type Here... "
        onChangeText={(text) => searchData(text)} value={text}
      />
      <View>
        <FlatList
          data={search}
          renderItem={({ item }) =>
            <TouchableOpacity style={{ backgroundColor: 'white' }} onPress={() => handleprofile(item.id)}>
              <Divider />
              <View style={{ padding: 10 }}>

                <Avatar size='medium' activeOpacity={0.7} rounded source={{ uri: item.dp }} />
              </View>
              <View style={{ position: 'absolute', }}>
                <Text style={{ fontSize: 20, marginTop: 20, paddingLeft: 80, fontWeight: 'bold' }}>{item.name}</Text>
              </View>
              <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                <Icon style={{ marginTop: 15, paddingEnd: 20 }} name="arrow-right" size={25} color="black"
                />
              </View>

            </TouchableOpacity>

          }
          keyExtractor={(item) => item.id}
        />

      </View>

    </>
  );
};


export default SearchOrginzer;
