import {Appearance, View, Text, StyleSheet, Platform, SafeAreaView, ScrollView, FlatList, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { create } from 'react-test-renderer';
import { useRouter } from "expo-router";
import { useLocalSearchParams, Stack } from "expo-router";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import {useState, useContext, useEffect, useRef} from "react";

import Animated, {LinearTransition} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';


export default function PlaceScreen() {

    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchPlace=async()=>{
            if(!id) return;

            try{
                const docRef = doc(db, 'places', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPlace(docSnap.data());
                  } else {
                    console.log('No such document!');
                  }
            }
            catch(e)
            {
                console.error(e);
            }
            finally{
                setLoading(false);
            }
        };
        fetchPlace();
    }, [id]);




    const {id} = useLocalSearchParams()

    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme,colorScheme);

    const router = useRouter()

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView


        if(loading)
        {
            return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <LottieView
                    source={require('../../assets/loading.json')}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
                {/* <Text style={styles.text}>Loading...</Text> */}
                </View>
              );
        }

        console.log("CONTACTS SCREEN LOADED")

        console.log("placesssss" + place.image);

        const name = {id};
        console.log(" SYNA : "+id);

        const favourite="";
    

    return(
        <>
        <Stack.Screen options={{ headerTitle: 'Place',  headerShown: true }} />
        < Animated.View style={styles.container}>
            <Image source={{uri : place.image}} style={styles.image}></Image>
            <View style={styles.column}>
                <Text style={styles.columnText}>{id}</Text>
                <Text style={styles.columnText2}>Address : {place.address}</Text>
                <View style={styles.coordinates}>
                <Text style={styles.columnText2}>Coordinates :</Text>
                <Text style={styles.columnText2}>Latitude : {place.coordinates.latitude}</Text>
                <Text style={styles.columnText2}>Longitude : {place.coordinates.longitude}</Text>
                </View>
                <Text style={styles.rating}>Rating : {place.rating}</Text>
                <Text style={styles.favourites}>Favourites : </Text>
                {/* <Text style={styles.columnText2}>{place.favourites}</Text> */}
                {/* <Text style={styles.columnText2}>{place.favourites}</Text> */}
                <View>
                {place.favourites.map((place, index) => {
                   return <Text style={styles.columnText2}>{place}</Text>
                }
                )}
                
                </View>

            </View>
            </Animated.View>
            </>
    )
}


function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'flex-start',
            alignItems:'center',
            backgroundColor:theme.background,
        },
        text:{
            color:'#ffffff',
            textAlign:'left',
            fontFamily:'SpaceMono',
            fontSize:20,
            fontWeight:'bold',
            marginTop:20,
        },
        image:{
            width:'100%',
            height:'40%', 
        },
        column:{
            marginTop:20,
            alignItems:'flex-start',
            width:'90%'
        },
        columnText:{
            color:'#ffffff',
            fontFamily:'SpaceMono',
            fontSize:20,
            fontWeight:'bold',
            marginTop:10,
        },
        columnText2:{
            color:'#ffffff',
            fontFamily:'SpaceMono',
            fontSize:16,
            marginTop:10,
        },
        rating:{
            color:'#ffffff',
            fontFamily:'SpaceMono',
            fontSize:16,
            marginTop:20,
        },
        coordinates:{
            marginTop:20,
        },
        favourites:{
            color:'#ffffff',
            fontFamily:'SpaceMono',
            fontSize:16,
            marginTop:20,

        }
    })
    }