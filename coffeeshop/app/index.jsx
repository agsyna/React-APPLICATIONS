import { View, Text , StyleSheet, ImageBackground, Pressable} from 'react-native'
import React from 'react'

import icedCoffeeImg from '@/assets/images/iced-coffee.png';
import { Link } from 'expo-router';
import Spacer from './spacer';


const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={icedCoffeeImg}
      style={styles.image}>
      <Text style={styles.text}>Coffee Shop</Text>
      <Link href="/menu" style={{marginHorizontal:'auto', borderRadius:12}} 
      asChild>
      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>Menu</Text>
        </Pressable>
      </Link>
      <Spacer height={20} />
      
      <Link href="/contact" style={{marginHorizontal:'auto', borderRadius:12}} 
      asChild>
      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>Contact Us</Text>
        </Pressable>
      </Link>
      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',

  },
  text:{
    color:'white',
    fontSize:32,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'rgba(0,0,0,0.5)', // 50% opacity
    marginBottom:20
  },
  image:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    resizeMode:'cover',
  },

  link :{
    color:'white',
    fontSize:12,
    fontWeight:'bold',
    textAlign:'center',
    textDecorationLine:'underline',
    backgroundColor:'rgba(0,0,0,0.5)',
    padding:4,
  },

  button:{
    height:60,
    borderRadius:20,
    backgroundColor:'rgba(0,0,0,0.5)',
    padding:6,
    justifyContent:'center',
  },

  buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
    // backgroundColor:'rgba(0,0,0,0.5)',
    padding:8,  
  }

})