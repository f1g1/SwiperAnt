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
import ImagesCarousel from './CarouselComponent';
import ItemInfoContainer from './ItemInfoContainer';

const { width: screenWidth ,height:screenHeight} = Dimensions.get('window');

export const ItemCard = () => {
    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
      };

return <View style={styles.bigContainer}>
    <ImagesCarousel/>
    <ItemInfoContainer/>



    <View style={styles.buttonsContainer}>
    <TouchableOpacity
        onPress={buttonClickedHandler}
        style={[styles.roundButton,styles.roundButtonPass]}>
        <Text style={{color:"black"}}>Pass</Text>
      </TouchableOpacity>
    
    <TouchableOpacity
        onPress={buttonClickedHandler}
        style={[styles.roundButton,styles.roundButtonLike]}>
        <Text style={{color:"black"}}>Like</Text>
      </TouchableOpacity>
    </View>
    </View>
    
}
export default ItemCard;
const styles = StyleSheet.create({
    bigContainer:{
        height:screenHeight,
        display:"flex",
        justifyContent: "space-between",
        backgroundColor:"white"
    },
    buttonsContainer:{
      display:'flex',
      flexDirection:"row",
      justifyContent:"space-evenly",
      width:screenWidth,
      paddingTop:15,
      alignSelf:"flex-end",
      height:120,
      backgroundColor:"rgba(1,1,1,0.1)"
    },
    roundButton: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent:"center",
        padding: 10,
        borderRadius: 100,
      
      },
      roundButtonLike:{
        backgroundColor: 'green',
        color:"black"
      },
      roundButtonPass:{
        backgroundColor: 'red',
        color:"black"
      }
  })
