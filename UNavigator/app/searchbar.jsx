import React from "react";
import {StylesSheet, TextInput, View, Keyboard, Button} from "react-native";
import {Feather, Entypo} from "@expo/vector-icons";

import {Appearance} from "react-native";
import {Colors} from '@/constanrs/Colors';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked})    => {    

    return (
        <View style={styles.container}>
        <Entypo name="menu" size={28} color="white" />
        <Text style={styles.searchText}>BML Munjal University</Text>
        <Entypo name="cross" size={28} color="white" />
        <Entypo name="mic" size={24} color="white" />
        </View> 
    )
}

export default SearchBar;

function createStyles(theme, appearance)
{

    return StyleSheet.create({
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
    })
}