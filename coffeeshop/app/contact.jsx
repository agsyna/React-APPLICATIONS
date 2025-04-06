import {Appearance, View, Text, StyleSheet, Platform, SafeAreaView, ScrollView, FlatList, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { create } from 'react-test-renderer';

import CoffeeShopImage from '@/assets/images/coffeeshop.jpg';


export default function ContactScreen() {

    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme,colorScheme);

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView
    console.log("CONTACTS SCREEN LOADED")

    return(
        <Container style={styles.container}>
            <Image source={CoffeeShopImage} style={styles.image}></Image>
            <View style={styles.column}>
                <Text style={styles.columnText}>Cofee Shop</Text>
                <Text style={styles.columnText2}>555, Cafe Lane</Text>
                <Text style={styles.columnText2}>Gurgaon, India </Text>
            </View>
            </Container>
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
})
}