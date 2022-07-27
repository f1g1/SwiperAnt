import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { OpacityDecorator } from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { BASE_URL } from '../../services/const'

export default function MessageComponent({ text, media, afterDifferent, isMyMessage, setHighlightedImage, isLoadedAll }) {
  return (
    isLoadedAll ?
      <View style={styles.noMoreMessage}>

        <Text>No messages to load from here!</Text>
      </View>
      :
      <View style={[styles.messageContainer, afterDifferent ? styles.afterDifferent : styles.afterSame]}>

        <View style={[styles.message, isMyMessage ? styles.myMessage : styles.otherMessage]}>
          {text ?
            <Text style={styles.textStyle}>{text}</Text>
            :
            <TouchableOpacity onLongPress={() => setHighlightedImage(media)} >
              <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: BASE_URL + media }}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  noMoreMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
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