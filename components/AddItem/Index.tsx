import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Dimensions, ScrollView, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import AddItemForm from "./AddItemForm";
import ImageForm from "./ImageForm";
import { SafeAreaView } from "react-native-safe-area-context";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const genderList = [
  {
    label: "RON",
    value: "ron",
  },
  {
    label: "EUR",
    value: "eur",
  },
  {
    label: "USD",
    value: "usd",
  },
];

export default function AddItem() {
  const [images, setImages] = useState([])

  const onSubmit = data => console.log(data);

  return (

    <AddItemForm onSumbit={onSubmit} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  }

})