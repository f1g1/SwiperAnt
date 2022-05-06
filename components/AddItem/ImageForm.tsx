import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from "react-native-paper";

const Separator = () => (
  <View style={styles.separator} />
);
export default function ImageForm({ images, setImages, setOpen }) {
  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          onPressOut={() => isActive = false}
        >
          <View style={styles.rowItem}>
            <Text style={styles.title}>Photo #{images?.indexOf(item) + 1}</Text>
            <Image
              style={styles.tinyLogo}
              source={{ uri: item?.uri }}
            />
            <Button color={"red"} onPress={() => deleteImage(item)} mode="contained" > Delete!</Button>
          </View>
        </TouchableOpacity>
      </ScaleDecorator >
    );
  };

  const deleteImage = (item) => {
    var filteredArray = images.filter(e => e?.uri !== item?.uri)
    setImages(filteredArray)
  }


  const startCamera = async () => {
    const result = await launchCamera({ mediaType: "photo", quality: 1, cameraType: "back", includeBase64: true });
    if (!result.didCancel && !result.errorCode)
      console.log("succes image camera")
    setImages(images.concat(result.assets));
  }

  const openLibrary = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1, selectionLimit: 0, includeBase64: true });
    if (!result.didCancel && !result.errorCode)
      console.log("succes image library")
    setImages(images.concat(result.assets));
  }

  return (
    <>
      <Text style={styles.title}>Gallery</Text>
      <Separator />

      <View style={styles.imageContainer}>
        <DraggableFlatList
          data={images}
          onDragEnd={({ data }) => setImages(data)}
          keyExtractor={(item) => item.uri}
          renderItem={renderItem}
        />
      </View >

      <View style={styles.galleryButton}>
        <Button onPress={startCamera} color="#4331e2" mode='contained'>Camera</Button>
      </View>
      <View style={styles.galleryButton}>
        <Button onPress={openLibrary} mode="contained">Phone Gallery</Button>
      </View>

      <View style={styles.backButton}>
        <Button onPress={() => setOpen(false)} mode="contained" color="red" >Back</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 20
  },
  rowItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    textBreakStrategy: 'simple'
  },
  rowButt: {
    fontSize: 20
  },
  galleryButton: {
    margin: 8
  },
  title: {
    fontSize: 22,
    color: "black",
    marginHorizontal: 8
  },
  tinyLogo: {
    width: 120,
    height: 120,
    margin: 5
  },
  imageContainer: {
    height: 500
  },

  errorText: {
    color: "red"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})