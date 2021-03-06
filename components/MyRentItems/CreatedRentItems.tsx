import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper'
import { BASE_URL } from '../../services/const';
import { DeleteMyRentItem, GetMyRentItems } from '../../services/RentItemService';
import { GetRentItemsByRentItem } from '../../services/UserRentItemService';
import AddItemForm from '../AddItem/AddItemForm';
import ChatsUserRentItem from '../Chat/ChatsUserRentItem';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function CreatedRentItems() {
    const [myRentItems, setmyRentItems] = useState([])
    const [editItem, setEditItem] = useState()
    const [rentItm, setRentItm] = useState()

    useEffect(() => {
        GetMyRentItems().then(data => setmyRentItems(data));
    }, [editItem])


    const deleteItem = (item) => {
        var filteredArray = myRentItems.filter(e => e.id !== item.id)
        DeleteMyRentItem(item.id).then(() => {
            setmyRentItems(filteredArray)
        })
    }

    const editPushed = (item) => {
        setEditItem(item);
    }

    const setRentItem = (item) => {
        setRentItm(item)
        if (item) {
            GetRentItemsByRentItem(item.id, null, null).then(res => {
                setChatUserRentItems(res)
            })
        }
    }

    const triggerBack = () => {
        setRentItm();
    }

    const renderRentItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity
                    onPressOut={() => isActive = false}
                >
                    <View style={styles.rowItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: BASE_URL + item.images[0]?.path }}
                        />
                        <View style={styles.buttonContainer}>
                            <Button onPress={() => editPushed(item)} mode="contained" > Edit</Button>
                            <Button onPress={() => setRentItem(item)} mode="contained" > Chats</Button>
                            <Button color={"red"} onPress={() => deleteItem(item)} mode="contained" > Delete</Button>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <>
            {rentItm ?
                <ChatsUserRentItem rentItm={rentItm} triggerBack={triggerBack} />
                : <>
                    {editItem ? (<AddItemForm givenItem={editItem} setGivenItem={setEditItem}></AddItemForm>)
                        : (
                            <View style={styles.imageContainer}>
                                <FlatList
                                    data={myRentItems}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderRentItem}
                                />
                            </View >
                        )}
                </>}
        </>

    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    title: {
        flex: 1,
        fontSize: 16,
        color: "black",
        marginHorizontal: 8
    },
    tinyLogo: {
        width: 120,
        height: 120,
        margin: 5
    },
    imageContainer: {
        height: screenHeight * 0.8
    },
    buttonContainer: {
        margin: 10,
        flex: 1,
        justifyContent: 'space-between',
        height: "70%"

    }
})