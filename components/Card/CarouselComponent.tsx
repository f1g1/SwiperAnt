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
import { BASE_URL } from '../../services/const';

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


const { width: screenWidth ,height:screenHeight} = Dimensions.get('window');

export const MyCarousel = ({ images }) => {
  const carouselRef = useRef();
  const goForward = () => {
    carouselRef?.current?.snapToNext();
  };
  const goBackwards = () => {
    carouselRef?.current?.snapToPrev();
  };
  const renderItem = ({ item, index }) => {
    return (
      <View >
        <Image
          style={{
            height: screenHeight-screenHeight*0.65,
          }}
          source={{ uri: BASE_URL + item.path }}
        />

      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth }
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
    height: screenHeight-screenHeight*0.65,
    width: 30,
    backgroundColor: "grey",
    opacity: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  rightArrow: { position: 'absolute', right: 0 },
  leftArrow: { position: 'absolute', left: 0 },
  carouselContainer: {
    backgroundColor: "gray"
  }
})


export default MyCarousel;
