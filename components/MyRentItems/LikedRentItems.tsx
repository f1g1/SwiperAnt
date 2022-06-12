import { loadConfig } from 'browserslist';
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper'
import { BASE_URL } from '../../services/conts';
import { DeleteMyRentItem, GetMyRentItems } from '../../services/RentItemService';
import { RemoveUserRentItem, GetLikedUserRentItems } from '../../services/UserRentItemService';
import AddItemForm from '../AddItem/AddItemForm';
import OneCircleMapComponent from '../Generic/OneCircleMapComponent';
import ItemCard from '../Card/Index';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function LikedRentItems() {
    const [myLikedRentItems, setmyLikedRentItems] = useState([])
    const [highlightedItem, setHighlightedItem] = useState()
    useEffect(() => {
        GetLikedUserRentItems(null, null).then((data) => {
            setmyLikedRentItems(data)
        });
    }, [])

    useEffect(() => {
        console.log("LIKED RENT ITEMS COUNT: ", myLikedRentItems.length)
    }, [myLikedRentItems])

    const deleteItem = (item) => {
        var filteredArray = myLikedRentItems.filter(e => e.id !== item.id)
        console.log(item.id)
        RemoveUserRentItem(item.id).then(() => {
            setmyLikedRentItems(filteredArray)
        })
    }

    // const editPushed=(item)=>{
    //     setEditItem(item);
    // }

    const renderItem = ({ item, index }) => {
        let rentItem = item.rentItem

        console.log("Item", item)
        return (

            <View style={styles.rowItem}>
                <View style={styles.mapStuff}>
                    <OneCircleMapComponent location={rentItem.location} />
                </View>
                {/* <Text style={styles.title}>{item.title}</Text> */}
                <TouchableOpacity
                    onPressOut={() => setHighlightedItem(rentItem)}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={{ uri: BASE_URL + rentItem.images[0]?.path }}

                    />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    {/* <Button onPress={() => editPushed(item)} mode="contained" > Chat</Button> */}
                    <Button color={"red"} onPress={() => deleteItem(item)} mode="contained" > Remove</Button>
                </View>
            </View>
        );
    };

    return (
        <>

            {highlightedItem ?
                <ItemCard item={highlightedItem} goBack={() => setHighlightedItem()} />
                :
                myLikedRentItems.length > 0 && (
                    <View style={styles.imageContainer}>
                        <FlatList
                            data={myLikedRentItems}
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
    rowButt: {
        fontSize: 20
    },
    galleryButton: {
        margin: 8
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: "black",
        marginHorizontal: 8
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
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    buttonContainer: {
        margin: 10,
        flex: 1,
        justifyContent: 'space-between',
        height: "70%"

    }
})