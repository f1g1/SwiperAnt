import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function MessageComponent({ text, afterDifferent, isMyMessage }) {
  return (
    <View style={[styles.messageContainer, afterDifferent ? styles.afterDifferent : styles.afterSame]}>
      <View style={[styles.message, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.textStyle}>{text}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  afterSame: {
    marginTop: 10
  },
  afterDifferent: {
    marginTop: 25
  },
  messageContainer: {
    display: "flex",
  },
  message: {
    borderRadius: 10,
    marginStart: 10,
    marginHorizontal: 50,
    marginEnd: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
  },
  myMessage: {
    backgroundColor: "#94bed7",
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "grey",
    alignContent: "flex-start",
    alignSelf: "flex-start",
  },
  textStyle: {
    color: "black",
    zIndex: 10000,
  }
})