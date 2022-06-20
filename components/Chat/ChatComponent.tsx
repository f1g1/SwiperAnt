import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { GetConversation, PostMessage } from '../../services/MessageService'
import MessageComponent from './MessageComponent'

export default function ChatComponent({ userRentItem, imOwner }) {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getConversation(userRentItem.rentItem.userId, userRentItem.userId, userRentItem.rentItem.id);
  }, [])

  useEffect(() => {

    console.log("messages:", messages)
  }, [messages])


  const getConversation = (ownerId, renterId, rentItemId) => {
    GetConversation(ownerId, renterId, rentItemId).then(newMessages => setMessages(messages.concat(newMessages)))
  }

  const sendMessage = () => {
    if (text != "")
      PostMessage(userRentItem, text, null).then((message) => {
        console.log("Send message messages: ", message)
        setMessages([...messages, message])
        setText("");

      })
  }

  return (<>
    <Text>{userRentItem.rentItem.title}</Text>
    <View style={styles.messagesContainer}>

      <ScrollView>

        {messages && messages?.length > 0 && messages.map(message => (
          <MessageComponent key={message.DateCreated + message.DateServer} afterDifferent={false} text={message.text} isMyMessage={message.IsFromOwner == imOwner} ></MessageComponent>
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