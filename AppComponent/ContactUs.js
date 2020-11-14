
import React from 'react';
import { Text,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { Card, Header,Button, Avatar, Divider, Tooltip, Badge, SearchBar } from 'react-native-elements';

const Contactus=()=> {
  function pick(){
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }
  return (
    <>
     <Header containerStyle={{ backgroundColor: 'white' }}
        centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Contact Us</Text>}
         />
      <Divider />
      <Button title="Done" type="outline"
                  onPress={pick} />
 
  </>
  );
};


export default Contactus;
