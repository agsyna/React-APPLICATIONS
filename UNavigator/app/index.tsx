import { Image, StyleSheet, Platform , View, Text, ImageBackground, Pressable, ScrollView, SafeAreaView} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Appearance } from 'react-native';
import MapView , {Marker} from 'react-native-maps'; 


import {Colors} from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme=='dark'?Colors.dark:Colors.light;

  const styles = createStyles(theme,colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView

  return (

  <View style={{ flex: 1, backgroundColor: '#161A32' , height: '100%'}}>
            <MapView
        style={styles.map}
        region={{
            latitude: 28.2469,
            longitude: 76.8131,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        >
       <Marker
      coordinate={{ latitude: 28.2469, longitude: 76.81315 }}
      title='BML Munjal University'
      description='This is where the magic happens!'
   ></Marker >
        </MapView>



  </View>
  );
}

function createStyles(theme, colorScheme) {

    return StyleSheet.create({

      map:{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      },
        
    })
}
