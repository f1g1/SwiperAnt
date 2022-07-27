import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper'
import { RemoveUserRentItem, GetLikedUserRentItems, GetRentItemsByRentItem } from '../../services/UserRentItemService';
import OneCircleMapComponent from '../Generic/OneCircleMapComponent';
import ItemCard from '../Card/Index';
import ChatComponent from '../Chat/ChatComponent';
import { BASE_URL } from '../../services/const';
import moment from 'moment';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function ChatsRentItems({userRentItem}) {
    const [chatRentItems, setChatRentItems] = useState([])
    const [openChatItem, setOpenChatItem] = useState()
    useEffect(() => {
        GetRentItemsByRentItem(userRentItem.id,null, null).then((data) => {
            setChatRentItems(data)
        });
    }, [])

    const deleteItem = (item) => {
        var filteredArray = chatRentItems.filter(e => e.id !== item.id)
        RemoveUserRentItem(item.id).then(() => {
            setChatRentItems(filteredArray)
        })
    }
    const openChat = (item) => {
        setOpenChatItem(item);
    }

    const renderItem = ({ item, index }) => {
        let rentItem = item.rentItem
        return (
            <View style={styles.rowItem}>
                <View style={styles.mapStuff}>
                    <OneCircleMapComponent location={rentItem.location} />
                </View>
                <TouchableOpacity
                    onPressOut={() => setHighlightedItem(rentItem)}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: BASE_URL + rentItem.images[0]?.path }}

                    />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button color={"red"} onPress={() => deleteItem(item)} mode="contained" > Remove</Button>
                    <Button onPress={() => openChat(item)} mode="contained" > Chat {item.chatCount}</Button>
                    {item.dateLastChat &&<Text>Last message on: {moment.unix(item.dateLastChat).format("MM-DD-YYYY")}</Text>}
                    
                    {/* <Text>{item.dateLastChat}</Text> */}

                </View>
            </View>
        );
    };

    return (
        <>
            {openChatItem ?
                <>
                    <ChatComponent userRentItem={openChatItem} />
                </>
                :
                highlightedItem ?
                    <ItemCard item={highlightedItem} goBack={() => setHighlightedItem()} />
                    :
                    chatRentItems.length > 0 && (
                        <View style={styles.imageContainer}>
                            <FlatList
                                data={chatRentItems}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                            />
                        </View >
                    )
            }
        </>

    )
}

const styles = StyleSheet.create({
    mapStuff: {
        width: 100,
        height: 100, zIndex: 99999,
        backgroundColor: "red"
    },
    rowItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    tinyLogo: {
        width: 100,
        height: 100,
        margin: 5
    },
    imageContainer: {
        height: screenHeight * 0.8
    },
    errorText: {
        color: "red"
    },
    buttonContainer: {
        margin: 10,
        flex: 1,
        justifyContent: 'space-between',
        height: "70%"

    }
})