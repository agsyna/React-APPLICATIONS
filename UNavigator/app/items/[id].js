import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Appearance } from 'react-native';
import { Colors } from '@/constants/Colors';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const screenWidth = Dimensions.get('window').width;
import Animated from 'react-native-reanimated';


export default function PlaceScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const json = await res.json();
        setProduct(json);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No product found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Product Details' }} />
      <Animated.ScrollView style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

        <Animated.View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>

          <View style={styles.ratingRow}>
            <StarRatingDisplay rating={product.rating?.rate || 4.5} starSize={22} />
            <Text style={styles.ratingText}>{product.rating?.rate || '-'} ({product.rating?.count} reviews)</Text>
          </View>

          <Text style={styles.price}>₹ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:  '#fff' || theme.background ,
    },
    image: {
      width: screenWidth,
      height: screenWidth * 1.2,
      marginBottom: 20,
      backgroundColor: '#f5f5f5',
    },
    content: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    category: {
      fontSize: 14,
      color: '#888',
      marginBottom: 10,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    ratingText: {
      marginLeft: 8,
      fontSize: 14,
      color: '#666',
    },
    price: {
      fontSize: 20,
      fontWeight: '600',
      color: '#1e88e5',
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      lineHeight: 22,
      color: 'gray',
      marginBottom: 30,
    },
  });
}
