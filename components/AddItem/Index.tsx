import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import AddItemForm from "./AddItemForm";
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
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
     <AddItemForm onSumbit={onSubmit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
  },
  errorText: {
    color: "red"
  }

})