import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    image: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    image: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    image: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    image: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];

const baseUrl = 'http://192.168.1.104:5055/';

const { width: screenWidth } = Dimensions.get('window');

export const MyCarousel = ({ images }) => {
  const carouselRef = useRef();
  const goForward = () => {
    console.log("HAHAHA FFF")
    carouselRef?.current?.snapToNext();
  };
  const goBackwards = () => {
    console.log("HAHAHA bbb")
    carouselRef?.current?.snapToPrev();
  };
  const renderItem = ({ item, index }) => {
    console.log("item", item)
    return (
      <View >
        <Image
          style={{
            width: 500,
            height: 350,
          }}
          source={{ uri: baseUrl + item.path }}
        />

      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        layout="default"
        scrollEnabled={false}
      />

      <TouchableOpacity style={[styles.arrow, styles.leftArrow]}
        onPress={goBackwards}>
        <Text> {"<---"} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.arrow, styles.rightArrow]} onPress={goForward} >
        <Text>{"--->"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: 50,
    height: 350,
    backgroundColor: "grey",
    opacity: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  rightArrow: { position: 'absolute', right: 0 },
  leftArrow: { position: 'absolute', left: 0 },
  carouselContainer: {
    height: 350,
    backgroundColor: "gray"
  }
})


export default MyCarousel;
