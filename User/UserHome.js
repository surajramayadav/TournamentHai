import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ActivityIndicator, Text, View, ScrollView, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Dot from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Header, Avatar, Divider, Tooltip,Button, Badge, SearchBar, Overlay, Input } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';
import Icon from 'react-native-vector-icons/Feather';
import En from 'react-native-vector-icons/Entypo';
const UserHome = ({ navigation }) => {
  const [orgid,setorgid]=useState()
  const [text,settext]=useState()
  const [arr,setarr]=useState([])
  const[postid,setpostid]=useState()
  const [id, setid] = useState([])
  const [visible, setVisible] = useState(false);
  const [data, setdata] = useState([])
  const[naam,setnaam]=useState()
  const[img,setimg]=useState()
  const[uuid,setuuid]=useState()
  const[no,setno]=useState()
  const[tname,settname]=useState()
  const[sports,setsports]=useState()
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    AsyncStorage.setItem('type', "user")
    AsyncStorage.getItem('User').then((value) => {
      const data = JSON.parse(value)
      setnaam(data.displayName)
      setimg(data.photoURL)
      setuuid(data.uid)
      firestore()
        .collection('User')
        .doc(data.uid)
        .set({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          photoURL: data.photoURL
        })
        .then(() => {
          console.log('User added!');
        });
    });
 

    firestore().collection("Posts")
    .orderBy("CreatedAt", "desc")
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
        setdata(list);
        setarr(list)

      })

  }, [])
  const searchData=(text) =>{
    const newData = arr.filter(item => {
      const itemData = item.sports.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
     setdata(newData)
      settext(text) 
    
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

  const toggleOverlay = (mainid,id,tname,sports) => {  
    setorgid(mainid)
    setpostid(id)  
    settname(tname)
    setsports(sports)
    setVisible(!visible);


  };
  const Tapply =()=>{
    firestore()
    .collection('Apply')
    .doc(uuid)
    .set({
      name: naam,
      phoneNumber:no,
      dp: img,
      Org_id:orgid,
      Post_id:postid,
      User_id:uuid,
      Tournament_Name:tname,
      sports:sports,
      CreatedAt:new Date()
    })
    .then(() => {
      alert("Apply Successfully !!!")
    });
    
    setVisible(!visible);

  }
  


  return (
    <>
       <Header containerStyle={{backgroundColor:'white'}}
     leftComponent={<Dot name='menu' size={25} color='black' onPress={()=>navigation.openDrawer()} />}
      centerComponent={<Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Tournaments</Text>}
      rightComponent={<Icon name='search' size={25} color='black' style={{paddingEnd:10}} onPress={()=>navigation.navigate('SearchOrginzer')} />}
    />
    <Divider/>
     <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{height:windowHeight/3,width:250}}>
          <En onPress={toggleOverlay} style={{position:'absolute',alignSelf:'flex-end'}} name="cross" size={40} color='black'/> 
          <View style={{marginTop:10}}>
            <Text style={{fontSize:25,alignSelf:'center',fontWeight:'bold',}}>Apply</Text>
          </View>
          <View style={{marginTop:10}}>
          <Input  placeholder='Phone Number'
          value={no}
          onChangeText={(text)=>setno(text)}
        leftIcon={<Icon name="phone" size={20} color='black'/>}
        />
        <View>
        <Button title="Apply" type="outline"
        onPress={()=>Tapply()}/>
        </View>
        <View style={{marginTop:20}}>
          <Text style={{fontSize:15,alignSelf:'center',fontWeight:'bold',}}>Orgnizer will contact You Soon !!!</Text>
        </View>
          </View>
       

        </View>
      </Overlay>
      <SearchBar containerStyle={{ backgroundColor: 'white', borderBottomColor: 'white', borderTopColor: 'white' }} inputContainerStyle={{ backgroundColor: 'white' }}
        placeholder="Search Sports "
        onChangeText={(text) => searchData(text)} value={text}
      />
      <Divider/>
    <View style={{flex: 1,backgroundColor:'white'}}>
    <FlatList
    data={data}
    renderItem={({item})=>
    <View>
      
    <View style={{marginTop:10 }}>
    <Text style={{ fontSize: 15,paddingLeft:10,fontWeight:'bold', }}>{item.Tournament_Name}
    <Badge  value={item.sports} status="error" containerStyle={{}} />
    </Text>
    <Text style={{ fontSize: 12,paddingLeft:10}}>{item.Location}</Text>
    
    </View>
   
  <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
    <TouchableOpacity  onPress={()=>toggleOverlay(item.mainid,item.id,item.Tournament_Name,item.sports)}>
  <Text style={{marginTop:22,paddingEnd:10,fontSize:15,}}>{item.one}₹ <Text style={{color:'#258ED7'}}>Apply</Text> </Text>
  </TouchableOpacity>
  </View>
   
    <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
      <Text style={{ marginTop:7, paddingEnd:10, fontSize: 12 }}>
        {item.Tournament_date}</Text>
  
    </View>

    <View style={{ paddingLeft: 10 ,marginTop:10}}>
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
      
      <Image source={{ uri: item.img_url }} style={{width:"100%", height:300 }} PlaceholderContent={<ActivityIndicator />} />
    </View><Text style={{alignSelf:'flex-end',fontSize:10,paddingEnd:10}}>{item.CreatedAt}</Text>
  

   <Divider/>
    
  </View>
  
    
  
  }
  keyExtractor={(item) => item.id}
      />

</View>
    </>
  );
};


export default UserHome;
