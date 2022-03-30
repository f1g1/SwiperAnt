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
const item={"title": "Apartament 2 camere decomandat Central", "link": "https://www.imobiliare.ro/inchirieri-apartamente/cluj-napoca/central/apartament-de-inchiriat-2-camere-X54N0017J", "location": "Cluj-Napoca","neighborhood": "zona Central", "rooms": "2 camere", "size": "55 mp utili", "level": "Etaj 2/4", "type": "Decomandat", "price": "350", "images": ["https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982148.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982160.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982156.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982154.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982152.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982136.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982138.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982142.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982166.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982162.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982158.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982164.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982140.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982144.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982146.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982150.jpg"]}

export const ItemCard = () => {
    const buttonClickedHandler = () => {
        console.log('You have been clicked a button!');
        // do something
      };

return <View style={styles.bigContainer}>
    <ImagesCarousel images={item.images}/>
    <ItemInfoContainer item={item}/>
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
