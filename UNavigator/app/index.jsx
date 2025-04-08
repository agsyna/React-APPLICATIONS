import { Image, StyleSheet, Platform , View,TouchableOpacity , Text, ImageBackground, Pressable, ScrollView, SafeAreaView} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Appearance , TouchableWithoutFeedback} from 'react-native';
import MapView , {Marker} from 'react-native-maps'; 

import {useState, useContext, useEffect, useRef} from "react";

import Dropdown from './dropdown';

import { useRouter } from "expo-router";



import {Colors} from '@/constants/Colors';

export default function HomeScreen() {

      const router = useRouter()
  

  const mapRef = useRef(null);

  const moveToCoordinates = (lat, lng) => {
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const addMarker = (lat, long) => {
    const newPlace = {
      coordinates: {
        latitude: lat,
        longitude: long
      }
    };
    setPlaces([...places, newPlace]);
  };
  

  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('BML Munjal University')
  const [places, setPlaces] = useState([]);


  const toggleVisibility = () =>{
    setIsVisible(!isVisible);
  };


  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme=='dark'?Colors.dark:Colors.light;

  const styles = createStyles(theme,colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView

  return (

    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>

  <View style={{ flex: 1, backgroundColor: '#161A32' , height: '100%'}}>
      
          <MapView
          ref={mapRef}
          style={styles.map}
          region={{
            latitude: 28.2469,
            longitude: 76.8131,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {places.map((place, index) => (
            place.coordinates &&
            <Marker
              key={index}
              coordinate={place.coordinates}
              title={place.id || `Marker ${index + 1}`}
              pinColor="red"
              onPress={() =>{
                console.log("Coordinates : "+place.coordinates);
              }
              }
            />
          ))}
        </MapView>

          <View style={styles.container}>
          <Entypo name="menu" size={28} color="white" />

          <Pressable style={styles.pressableRow} onPress={toggleVisibility}>
          <Text style={styles.searchText}>{text}</Text>
          <Entypo name="select-arrows" size={24} color="white" />
          <Dropdown 
          isVisible={isVisible} 
          // setIsVisible={setIsVisible}
          moveToCoordinates={moveToCoordinates} 
          setText={setText} 
          setPlaces={setPlaces}
          addMarker={addMarker}
          />

          </Pressable>

          </View> 


          <Pressable style={{bottom:100, left:300, backgroundColor:"black", padding:8, borderRadius:8}} onPress={()=> 
          router.push(`/explore`)
          }>
          <Entypo name="add-to-list" size={40} color="gray" />
          </Pressable>
  </View>
  </TouchableWithoutFeedback>
  );
}

function createStyles(theme, colorScheme) {

    return StyleSheet.create({

      map:{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      },

      container:{
        position: 'absolute',
        marginTop: 60,
        borderRadius: 10,
        marginHorizontal: 20,
        width: '90%',
        backgroundColor: '#222745',
        height: '8%',
        justifyContent: 'space-around',
        alignItems:'center',
        flexDirection:'row',
      },
      searchText:{
        fontSize: 16,
        color:theme.text
      },
        pressableRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 40,
          width:200,
          // marginTop: 200,
        },
        dropdown:{
          // position: 'absolute',
          // top: 800,
          // left: 20,
          // width: '90%',
          // zIndex: 1000
        }
        
    })
}
