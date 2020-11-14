
import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import { Card, Header, Avatar, Divider, Tooltip, Button, Badge, SearchBar, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserActivity = ({ navigation }) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        AsyncStorage.getItem("Uid").then((value) => {
            firestore().collection("Apply")
                .where("User_id", "==", value)
                .onSnapshot(function (snapshot) {
                    const list = []
                    snapshot.forEach(doc => {
                        list.push({
                            name: doc.data().name,
                            no: doc.data().phoneNumber,
                            dp: doc.data().dp,
                            Tournament_Name: doc.data().Tournament_Name,
                            id: doc.data().Post_id,
                            sports: doc.data().sports,
                            CreatedAt: doc.data().CreatedAt.toDate().toDateString(),
                        })
                        setdata(list)
                        console.log(list)

                    });

                })
        })
        

    }, [])

    const apply = (id) => {
        firestore().collection("Apply").doc(id).delete().then(function () {
            alert("Cancel Sucessfully")
          })
    }
    return (
        < >
            <Header containerStyle={{ backgroundColor: 'white' }}
                leftComponent={<Icon name='arrow-left' size={25} color='black' onPress={() => navigation.goBack()} />}
                centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> My Activity </Text>}

            />
            <Divider />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: 'white' }} >
                            <Divider />
                            <Card >
                                <View style={{}}>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, fontWeight: 'bold' }}>{item.Tournament_Name}</Text>
                                    <Text style={{ paddingLeft: 5, }}>{item.sports}</Text>

                                </View>

                                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => apply(item.id)}>
                                        <Text style={{ paddingEnd: 20, fontSize: 15, color: 'blue' }} >Cancel</Text></TouchableOpacity>
                                </View>
                                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                                    <Text style={{ marginTop: 30, paddingEnd: 10, fontSize: 8 }}>{item.CreatedAt}</Text>
                                </View>
                            </Card>
                        </View>

                    }
                    keyExtractor={(item) => item.id}
                />

            </View>


        </>
    );
};


export default UserActivity;
