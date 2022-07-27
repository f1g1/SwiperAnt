import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { Button, Text, TextInput } from 'react-native-paper'
import { BASE_URL } from '../../services/const'
import { GetConversation, PostMessage } from '../../services/MessageService'
import { GetSignalrConnection } from '../../services/SignalRService'
import MessageComponent from './MessageComponent'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ChatComponent({ userRentItem, imOwner, triggerBack }) {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [newMessageSR, setNewMessageSR] = useState()
  const [images, setImages] = useState([])
  const [highlightedImage, setHighlightedImage] = useState()
  const [aspectRatio, setAspectRatio] = useState()
  const [pagesLoaded, setPagesLoaded] = useState(0)
  const ScrollViewRef = useRef();

  const PAGE_SIZE = 20;

  useEffect(() => {
    handleGetConversation();
    let connection = GetSignalrConnection()
    connection.on("ReceiveMessage", (message) => {
      setNewMessageSR(message)
    })
  }, [])

  useEffect(() => {
    if (highlightedImage) {
      Image.getSize(BASE_URL + highlightedImage, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [highlightedImage])


  useEffect(() => {
    if (newMessageSR)
      setMessages([...messages, newMessageSR]);
  }, [newMessageSR])


  const handleGetConversation = () => {
    if (pagesLoaded != -1) {
      GetConversation(userRentItem.rentItem.userId, userRentItem.userId, userRentItem.rentItem.id, PAGE_SIZE, PAGE_SIZE * pagesLoaded)
        .then(newMessages => {
          if (newMessages.length < PAGE_SIZE) {
            setPagesLoaded(-1)
            newMessages.unshift({ isLoadedAll: true })
          }
          else {
            setPagesLoaded(pagesLoaded + 1);
            newMessages = newMessages.slice(1)
          }
          setMessages(newMessages.concat(messages));
        })
      return true;
    }
    return false;
  }

  const sendMessage = () => {
    if (text != "")
      PostMessage(userRentItem, text, null, imOwner).then((message) => {
        setMessages([...messages, message])
        setText("");
      })

    if (images.length > 0) {
      images.forEach(image => {
        let message = PostMessage(userRentItem, null, image.base64, imOwner)
        setMessages([...messages, message])
      });
      setImages([]);
    }
  }

  const openLibrary = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1, selectionLimit: 0, includeBase64: true });
    if (!result.didCancel && !result.errorCode)
      if (text != "") {
        setText("");
      }
    setImages(images.concat(result.assets));
  }

  const ifCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
  };

  const deleteImage = (item) => {
    var filteredArray = images.filter(e => e?.uri !== item.uri)
    setImages(filteredArray)
  }
  return (<>
    <View style={styles.header}>
      <Text>{userRentItem.rentItem.title}</Text>
      <Button onPress={triggerBack} mode="contained">Back</Button>
    </View>

    {highlightedImage ?
      <View style={styles.highlightImg}>
496        <Image source={{ uri: BASE_URL + highlightedImage }} style={{ width: screenWidth - 40, aspectRatio, maxHeight: screenHeight * 0.7 }} />
        <Button onPress={() => setHighlightedImage()}>Close</Button>
      </View>
      :
      <>
        <View style={{ ...styles.messagesContainer, display: !highlightedImage ? "flex" : "none" }}>
          <ScrollView
            ref={ScrollViewRef}
            onLayout={() => ScrollViewRef.current.scrollToEnd()}
            onScroll={({ nativeEvent }) => {
              if (ifCloseToTop(nativeEvent)) {
                if (handleGetConversation())
                  ScrollViewRef.current.scrollTo({
                    y: nativeEvent.layoutMeasurement.height,
                    x: 0,
                    animated: false,
                  });
              }
            }}
            scrollEventThrottle={400}>

            {messages && messages?.length > 0 && messages.map((message, i) => (
              <MessageComponent key={i} afterDifferent={false} text={message.text} media={message.media} isMyMessage={message.isFromOwner === imOwner} setHighlightedImage={setHighlightedImage} isLoadedAll={message.isLoadedAll} ></MessageComponent>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <Button mode='outlined' onPress={openLibrary}>C</Button>
          {images.length == 0 ?
            <TextInput style={styles.input} value={text} onChangeText={setText}>
            </TextInput>
            :
            images.map((image, i) => (
              <View key={"imageToBeSent" + i}>
                <Button color='red' mode="text" style={styles.closeImageButton} onPress={() => deleteImage(image)}>x</Button>
                <Image style={styles.imageThumbnail} key={image?.uri} source={{ uri: image?.uri }} />
              </View>
            ))
          }
          <View style={styles.inputButton}>
            <Button mode='outlined' onPress={sendMessage}>></Button>
          </View>
        </View>
      </>
    }
  </>
  )
}
const styles = StyleSheet.create({
  highlightImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
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
    display: "flex",
    flex: 1,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",

  },
  inputButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    marginTop: 35
  },
  closeImageButton: {
    position: "absolute",
    top: 0,
    alignSelf: 'center',
    zIndex: 9999,
  }
})