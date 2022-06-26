import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { GetConversation, PostMessage } from '../../services/MessageService'
import MessageComponent from './MessageComponent'

export default function ChatComponent({ userRentItem, imOwner, triggerBack }) {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getConversation(userRentItem.rentItem.userId, userRentItem.userId, userRentItem.rentItem.id);
  }, [])

  const getConversation = (ownerId, renterId, rentItemId) => {
    GetConversation(ownerId, renterId, rentItemId).then(newMessages => setMessages(messages.concat(newMessages)))
  }

  const sendMessage = () => {
    if (text != "")
      PostMessage(userRentItem, text, null, imOwner).then((message) => {
        console.log("Send message messages: ", message)
        setMessages([...messages, message])
        setText("");

      })
  }

  return (<>
    <View style={styles.header}>
      <Text>{userRentItem.rentItem.title}</Text>
      <Button onPress={triggerBack} mode="contained">Back</Button>
    </View>
    <View style={styles.messagesContainer}>

      <ScrollView>
        {messages && messages?.length > 0 && messages.map((message, i) => (
          <MessageComponent key={i} afterDifferent={false} text={message.text} isMyMessage={message.isFromOwner === imOwner} ></MessageComponent>
        ))}

      </ScrollView>

    </View>


    <View style={styles.inputContainer}>

      <TextInput style={styles.input} value={text} onChangeText={setText}>
      </TextInput>
      <View style={styles.inputButton}>
        <Button mode='outlined' onPress={sendMessage}>></Button>
      </View>
    </View>

  </>
  )
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "grey"
  },
  messagesContainer: {
    flex: 1
  },
  input: {
    width: "80%",
    paddingTop: 0,
    paddingBottom: 0
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row"
  },
  inputButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5
  }
})