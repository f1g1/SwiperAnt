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
  SlideInLeft,
  Layout,
  SlideOutRight,
  SlideInDown
} from 'react-native-reanimated';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default ItemCard = ({ item, triggerNext }) => {
  const [liked, setLiked] = useState()


  useEffect(() => {
    console.log(item)
  }, [])

  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do somethingF
  };

  return (
    // <Animated.View
    //   entering={SlideInDown.delay(100)}
    //   exiting={liked ? SlideOutRight : SlideOutRight}
    //   
    //   layout={Layout.springify()}
    // >
    <View style={styles.bigContainer}>
      <ImagesCarousel images={item.images} />
      <ItemInfoContainer item={item} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={buttonClickedHandler}
          style={[styles.roundButton, styles.roundButtonPass]}>
          <Text style={{ color: "black" }}>Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={buttonClickedHandler}
          style={[styles.roundButton, styles.roundButtonLike]}>
          <Text style={{ color: "black" }}>Like</Text>
        </TouchableOpacity>
      </View>
      {/* </Animated.View > */}
    </View>
  )
}
const styles = StyleSheet.create({
  bigContainer: {
    height: screenHeight,
    display: "flex",
    justifyContent: "space-evenly",
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
    height: 120,
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
