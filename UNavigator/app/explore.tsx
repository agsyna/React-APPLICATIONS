import { StyleSheet, Image, Text, View,TouchableOpacity , ActivityIndicator, Pressable, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {LinearTransition} from 'react-native-reanimated';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useRouter } from 'expo-router';

import LottieView from 'lottie-react-native';



export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const toggleLike = (id) => {
  //   setLikedItems((prev) =>
  //     prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
  //   );
  // };

  const handlePress = (id) => {
    router.push(`/items/${id}`);
  };


  return (
    <View style={styles.mainView}>
      {isLoading ? (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <LottieView
                    source={require('../assets/loading.json')}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
                <Text style={{fontSize:14}}>Loading...</Text>
                </View>
              ) : (
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item['id']}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productCard} onPress={() => handlePress(item.id)} activeOpacity={0.5}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item['image'] }} style={styles.productImage} resizeMode="contain" />
                <Pressable style={styles.heartIcon}>
                <Text >♡</Text>
                </Pressable>
              </View>
              <Text style={styles.price}>INR {item['price']}</Text>
              <Text style={styles.title} numberOfLines={2}>{item['title']}</Text>
              <StarRatingDisplay
                rating={item['rating']?.['rate'] || 4.5}
                starSize={16}
                starStyle={{ marginHorizontal: 1 }}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor:theme.background,
  },
    mainView: {
      flex: 1,
      padding: 16,
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#fdfdfd',
    },
    productCard: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 16,
      borderRadius: 10,
      width: '48%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    imageWrapper: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    productImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
    },
    heartIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
      fontSize: 18,
      color: '#e91e63',
    },
    brandText: {
      fontSize: 12,
      color: '#888',
      marginBottom: 4,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    price: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1e88e5',
    },
  });
}
