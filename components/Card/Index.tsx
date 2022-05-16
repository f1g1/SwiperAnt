import React, { useRef, useState, useEffect } from 'react';
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
import Animated, {
  Layout,
  SlideOutRight,
  SlideInDown,
  SlideOutLeft,
  useSharedValue,
  SlideOutUp
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import MapViewComponent from '../Generic/MapViewComponent';
import { PostUserRentItem } from '../../services/UserRentItemService';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default ItemCard = ({ item, triggerNext }) => {
  const [liked, setLiked] = useState()
  const [dateViewd, setDateViewd] = useState()

  useEffect(() => {
    if (liked == false || liked == true)
      triggerNext()
  }, [liked])

  useEffect(() => {
    setDateViewd(Date.now())
  }, [item])

 const getUserRentItem=()=>{
   let userRentItem={
    DateViewd:dateViewd,
    DateInteraction:Date.now(),
    RentItemId:item.id
   }
   return userRentItem;
 }
  const likePressed = () => {
    let userRentItem=getUserRentItem()
    PostUserRentItem({...userRentItem,Liked:true});
    setLiked(true);
  }
  const dislikePressed = () => {
    let userRentItem=getUserRentItem()
    PostUserRentItem({...userRentItem,Liked:false});
    setLiked(false);
  }

  return (
    <Animated.View
      entering={SlideInDown.delay(100)}
      exiting={SlideOutUp}
      layout={Layout.springify()}
    >

      <View style={styles.bigContainer}>
        <ImagesCarousel images={item.images} />
        <ScrollView style={[liked == true ? styles.green : liked == false ? styles.red : {}]}>
          <ItemInfoContainer item={item} />
          <View style={styles.showMapContainer}>
            <MapViewComponent items={[item]} />
          </View>

        </ScrollView>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={dislikePressed}
          style={[styles.roundButton, styles.roundButtonPass]}>
          <Text style={{ color: "black" }}>Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={likePressed}
          style={[styles.roundButton, styles.roundButtonLike]}>
          <Text style={{ color: "black" }}>Like</Text>
        </TouchableOpacity>
      </View>

    </Animated.View >
  )
}
const styles = StyleSheet.create({
  showMapContainer: {
    height: 100,
    width: screenWidth,
  },
  red: {
    backgroundColor: "rgba(255, 41, 41, 0.2)"
  },
  green: {
    backgroundColor: "rgba(0, 255, 0, 0.2)"
  },
  bigContainer: {
    height: screenHeight - screenHeight * 0.274,
    display: "flex",
    backgroundColor: "white",
    zIndex: 10000
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: screenWidth,
    paddingTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "rgba(1,1,1,0.1)",
    marginBottom: 45
  },
  roundButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderRadius: 100,

  },
  roundButtonLike: {
    backgroundColor: 'green',
    color: "black"
  },
  roundButtonPass: {
    backgroundColor: 'red',
    color: "black"
  }
})