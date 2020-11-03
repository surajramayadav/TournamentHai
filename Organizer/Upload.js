import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, YellowBox, } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import En from 'react-native-vector-icons/Entypo';
import { Header, Input, Button, Overlay, Divider, Avatar,Accessory  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const Upload = () => {

  const [img, setimag] = useState('../assets/default.jpg')
  const [imgurl, setimgurl] = useState()
  const [sports, setsports] = useState()
  const [Desc, setdesc] = useState()
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


  }, [])

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const Uploadimg = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        //const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setimag(source);
      }
    });

  }
  const Post = async () => {
    const postid = await AsyncStorage.getItem('Uid')
    const { uri } = img;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

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
        description: Desc,
        img_url: url,
        Tournament_date: date,
        Location: location,
        Teams: team,
        id: postid,
        price1:one,
        price2:two,
        price3:three,
        CreatedAt: new Date(),
      })

    setname()
    setno()
    setsports()
    setdate()
    setdesc()
    setimgurl()
    setfees()
    setteam()
    setlocation()
    setone()
    setthree()
    settwo()
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
      />
      <Divider/>
     <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      
        <View style={{height:460,width:250}}>
        <ScrollView>
          <En onPress={toggleOverlay} style={{position:'absolute',alignSelf:'flex-end'}} name="cross" size={40} color='black'/> 
          <View style={{}}>
            <Text style={{fontSize:25,alignSelf:'center',fontWeight:'bold',}}>Description</Text>
          </View>
          <View style={{marginTop:5}}>
          <Input  placeholder='No of Teams'
          multiline={true}
          value={team}
          onChangeText={(t)=>setteam(t)}
        />
        <Input  placeholder='1st Price'
           value={one}
           onChangeText={(t)=>setone(t)}
          />
          <Input  placeholder='2nd price'
           value={two}
           onChangeText={(t)=>settwo(t)}
          />
          <Input  placeholder='3rd price'
           value={three}
           onChangeText={(t)=>setthree(t)}
          />
          <Input  placeholder='Contact No '
           value={no}
           onChangeText={(t)=>setno(t)}
          />

        <View>
        <Button title="Done" type="outline"
        onPress={toggleOverlay}/>
        </View>
       
          </View>
       
          </ScrollView>
        </View>
        
      </Overlay>



      
      <View style={{flex:1,backgroundColor:'white',}}>
       
      <ScrollView>
        <Input 
          placeholder='Tournament Name'
          value={name}
          onChangeText={(t) => setname(t)}
        />
        <Input
          placeholder='Tournament Entry Fess'
          value={fees}
          onChangeText={(t) => setfees(t)}
        />
        <Input
          placeholder='Enter Sports Name'
          value={sports}
          onChangeText={(text) => setsports(text)}
        />
         <Input
          placeholder='Address'
          value={location}
          onChangeText={(t) => setlocation(t)}
        />

        <Input
          placeholder='Decription'
          value={Desc}
          multiline={true}
          onChangeText={(t) => setdesc(t)}
        />
       
        <Button containerStyle={{margin:10}}
          title="Description"
          type="outline"
          onPress={ toggleOverlay}
        />
        <Button  containerStyle={{margin:10}}
          title="Pick Date"
          type="outline"
          onPress={() => setDatePickerVisibility(true)}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />


        <Button  containerStyle={{margin:10}}
          title="Pick Image"
          type="outline"
          onPress={Uploadimg}
        />
        <Button  containerStyle={{margin:10}}
          title="Upload Post !"
          type="outline"
          onPress={Post}
        />
      
      </ScrollView>
   

      </View>
     </>

  );
};


export default Upload;
