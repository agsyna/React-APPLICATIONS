import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Pressable} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';

import { useRouter } from "expo-router";


function Dropdown(props) {

    const [options, setOptions] = useState([]);

    const router = useRouter()

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const placesRef = collection(db, 'places');
          const querySnapshot = await getDocs(placesRef);
          const placeData = [];
          const coordinatesData=[];
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            placeData.push({ id: doc.id, ...data });
            props.addMarker(data.latitude, data.longitude);
            coordinatesData.push({ id: doc.id, latitude: data.latitude, longitude: data.longitude });

        })

          setOptions(placeData);
          props.setPlaces(coordinatesData);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };
  
      if (props.isVisible) {
        fetchData();
      }
    }, [props.isVisible]);
  
    if (!props.isVisible) 
        {
            // setText("Loading...")
            return null;
        }

    const handlePress = (id) =>{
        router.push(`/places/${id}`)
    }
  
    return (
      <View style={styles.dropdown}>

        {options.map((item, index) => (
        <View key={item.id}style={styles.optionRow}>
          <TouchableOpacity key={item.id} style={styles.option} onPress={() => {
            const {latitude, longitude} = item.coordinates;
            props.moveToCoordinates(latitude, longitude);
            props.setText(item.id);
            console.log(" latitude = "+latitude+" longitude "+longitude)
            console.log(item)
            
            
          }}>
            <Text style={styles.optionText}>{item.id}</Text>
          </TouchableOpacity>
            <Pressable
            onPress={() => handlePress(item.id)} 
            >
                  <Entypo name="arrow-with-circle-right" size={24} color="black" />
            </Pressable>
                  </View>

        ))}

      </View>
    );
  }
  

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    width:300,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
    alignSelf:'center',
    top:56,
    right:10
  },
  optionRow:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:8,

  },
  option: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width:400
    
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
