import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Text, TextInput } from 'react-native-paper'
import { GetRentItemsByRentItem } from '../../services/UserRentItemService'
import ChatComponent from './ChatComponent'

export default function ChatsUserRentItem({ rentItm, triggerBack }) {
  const [openChatItem, setOpenChatItem] = useState()
  const [chatUserRentItems, setChatUserRentItems] = useState([])


  const handleOpenChat = (item) => {
    setOpenChatItem(item)
    if (item) {

    }
  }

  useEffect(() => {
    if (rentItm) {
      GetRentItemsByRentItem(rentItm.id, null, null).then(res => {
        setChatUserRentItems(res)
      })
    }
  }, [])

  const renderChatItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleOpenChat(item)}
      >
        <View style={styles.chatItemContainer}>
          <View>
            <Text>Name: {item.user.givenName + " " + item.user.familyName}</Text>
            <Text># {item.userId.slice(-4)}</Text>
          </View>
          <View>
            <Text>Messages: {item.chatCount}</Text>
            {item.dateLastChat && <Text>Last message: {moment.unix(item.dateLastChat).format("MM-DD / HH:MM")}</Text>}
          </View>
        </View>
      </TouchableOpacity>

    );
  };


  return (<>
    {openChatItem ?
      <ChatComponent userRentItem={openChatItem} imOwner={true} triggerBack={() => setOpenChatItem()} />
      :
      <>
        <View style={styles.header}>
          <Text>Chats for: {rentItm.title}</Text>
          <Button onPress={triggerBack} mode="contained">Back</Button>
        </View>

        <View style={styles.imageContainer}>
          <FlatList
            data={chatUserRentItems}
            keyExtractor={(itm) => itm.id}
            renderItem={renderChatItem}
          />
        </View >
      </>
    }

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
  chatItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#1666a6",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 5
  },

})