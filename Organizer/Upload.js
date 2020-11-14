import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, View, YellowBox, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import En from 'react-native-vector-icons/Entypo';
import { Header, Input, Button, Overlay, Divider, Avatar, Accessory } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const Upload = () => {
  
  const [load, setload] = useState(false)

  const [uname, setuname] = useState('')
  const [uemail, setuemail] = useState('')
  const [udp, setudp] = useState('../assets/default.jpg')
  
  const [img, setimag] = useState('../assets/default.jpg')
  const [imgurl, setimgurl] = useState()
  const [sports, setsports] = useState()

  const [name, setname] = useState()
  const [no, setno] = useState()
  const [date, setdate] = useState();
  const [fees, setfees] = useState();
  const [location, setlocation] = useState()
  const [one, setone] = useState()
  const [two, settwo] = useState()
  const [three, setthree] = useState()
  const [team, setteam] = useState()

  const [visible, setVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  useEffect(() => {

    AsyncStorage.getItem('Organizer').then((value) => {
      const data = JSON.parse(value)
      setuname(data.displayName)
      setuemail(data.email)
      setudp(data.photoURL)
    })

  }, [])


function Gallery(){
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true
  }).then(image => {
    console.log(image);
    setimag(image);
  });
}

  const Post = async () => {
    setload(true)
    const postid = await AsyncStorage.getItem('Uid')
    const { path } = img;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;

    const task = storage()
      .ref("Posts/" + filename)
      .putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    const url = await storage()
      .ref("Posts/" + filename)
      .getDownloadURL();

    setimgurl(url)

    const uid = await AsyncStorage.getItem('Uid')

    await firestore()
      .collection("Posts")
      .add({
        Tournament_Name: name,
        entry_fees: fees,
        phone_no: no,
        sports: sports,
        img_url: url,
        Tournament_date: date,
        Location: location,
        Teams: team,
        id: postid,
        price1: one,
        price2: two,
        price3: three,
        uname: uname,
        udp: udp,
        uemail: uemail,
        CreatedAt: new Date(),
      })

    setname()
    setno()
    setsports()
    setdate()

    setimgurl()
    setfees()
    setteam()
    setlocation()
    setone()
    setthree()
    settwo()
    setload(false)
    alert("Uploaded Sucessfully")



  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setdate(date)
    hideDatePicker();
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Header containerStyle={{ backgroundColor: 'white' }}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> Upload Tournament </Text>}
        rightComponent={<ActivityIndicator animating={load} size='large' color="#ff0000" />}
      />
      <Divider />


      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

        <View style={{ height: windowHeight / 1.6, width: windowWidth / 1.3 }}>
          <ScrollView
          showsVerticalScrollIndicator={false}>
            <En onPress={toggleOverlay} style={{ position: 'absolute', alignSelf: 'flex-end' }} name="cross" size={40} color='black' />
            <View style={{}}>
              <Text style={{ fontSize: 25, alignSelf: 'center', fontWeight: 'bold', }}>Description</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Input placeholder='No of Teams'

                value={team}
                onChangeText={(t) => setteam(t)}
              />
              <Input placeholder='1st Price'
                value={one}
                onChangeText={(t) => setone(t)}
              />
              <Input placeholder='2nd price'
                value={two}
                onChangeText={(t) => settwo(t)}
              />
              <Input placeholder='3rd price'
                value={three}
                onChangeText={(t) => setthree(t)}
              />
              <Input placeholder='Contact No '
                value={no}
                onChangeText={(t) => setno(t)}
              />

              <View>
                <Button title="Done" type="outline"
                  onPress={toggleOverlay} />
              </View>

            </View>

          </ScrollView>
        </View>


      </Overlay>



      <View style={{ flex: 1, backgroundColor: 'white', }}>

        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }} >
          <View
            style={{ width: windowWidth, height: 50, }}>
            <Input
              placeholder='Tournament Name'
              value={name}
              onChangeText={(t) => setname(t)}
            />

          </View>
          <View
            style={{ width: windowWidth, height: 50, marginTop: 10 }}>

            <Input
              placeholder='Location'
              value={location}
              onChangeText={(t) => setlocation(t)}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>


            <View style={{ width: windowWidth / 3, height: 50, }} >
              <Input
                placeholder='Entry Fees'
                value={fees}
                onChangeText={(t) => setfees(t)}
              />
            </View>
            <View style={{ width: windowWidth / 2, height: 50, }} >
              <Input
                placeholder='Sports Name'
                value={sports}
                onChangeText={(text) => setsports(text)}
              />
            </View>


          </View>
          <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>


            <View style={{ width: windowWidth / 2, height: 50, }} >
              <Input
                disabled={true}
                placeholder='Date'
                value={date ? (date.toDateString()) : (date)}

              />
            </View>
            <View style={{ width: windowWidth / 2, height: 50, }} >
              <Button containerStyle={{ margin: 10 }}
                title="Pick Date"
                type="outline"
                onPress={() => setDatePickerVisibility(true)}
              />

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate = {new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>




          </View>




          <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

            <View style={{ width: windowWidth / 2, height: 50, }} >
              <Button containerStyle={{ margin: 10 }}
                title="Description"
                type="outline"
                onPress={toggleOverlay}
              />
            </View>
            <View style={{ width: windowWidth / 2, height: 50, }} >
              <Button containerStyle={{ margin: 10 }}
                title="Pick Image"
                type="outline"
                onPress={Gallery}
              />
            </View>

          </View>

          <View style={{ marginTop: 20 }}>
            <Button containerStyle={{ margin: 30 }}
              title="Upload Post "
              type='solid'
              disabled={load}
              onPress={Post}
            />
            <Text style={{
              fontSize: 12, paddingLeft: 15, color: 'red'
            }}># Note :- Image should be containing all tournament data (300x300) </Text>

          </View>
        </ScrollView>


      </View>

    </>

  );
};


export default Upload;
