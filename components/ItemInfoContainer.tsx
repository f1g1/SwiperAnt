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
import { useTailwind } from 'tailwind-rn/dist';

const { width: screenWidth ,height:screenHeight} = Dimensions.get('window');

export const ItemInfoContainer = (item) => {
	const tailwind = useTailwind();

return <View style={styles.bigContainer}>
   <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Price:</Text>
  <Text style={[styles.fieldLabel,styles.bold]}>{item.Price}</Text>
  </View>
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Surface:</Text>
  <Text style={styles.fieldLabel}>{item.Price+" mp"}</Text>
  </View>
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Rooms:</Text>
  <Text style={styles.fieldLabel}>{item.rooms}</Text>
  </View>
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Type:</Text>
  <Text style={styles.fieldLabel}>{item.type}</Text>
  </View>
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Level:</Text>
  <Text style={styles.fieldLabel}>{item.level}</Text>
  </View>
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Location:</Text>
  <Text style={styles.fieldLabel}>{item.location}</Text>
  </View>
 

    </View>
    
}
export default ItemInfoContainer;
const styles = StyleSheet.create({
    bigContainer:{
        display:"flex",
        flex:1,
        backgroundColor:"rgba(1,1,1,0.2)"
    },
    characteristic:{
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      borderBottomWidth:1,
      marginVertical:10
    },
    fieldLabel:{
      fontSize:20,
      marginHorizontal:30,
      color:"black",
      fontFamily: "Cochin"
    },
    bold:{
      fontWeight:"bold"
    }
  })
