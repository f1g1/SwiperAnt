import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper'
import { BASE_URL } from '../../services/conts';
import { DeleteMyRentItem, GetMyRentItems } from '../../services/RentItemService';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function MyRentItems() {
    const [myRentItems, setmyRentItems] = useState([])
    useEffect(() => {
        GetMyRentItems().then(data => setmyRentItems(data));
    }, [])



    const deleteItem = (item) => {
        var filteredArray = myRentItems.filter(e => e.id !== item.id)
        console.log(item.id)
        DeleteMyRentItem(item.id).then(() => {
            setmyRentItems(filteredArray)
        })
    }


    const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    onPressOut={() => isActive = false}
                >
                    <View style={styles.rowItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: BASE_URL + item.images[0]?.path }}
                        />
                        <Button color={"red"} onPress={() => deleteItem(item)} mode="contained" > Delete!</Button>
                    </View>
                </TouchableOpacity>
            </ScaleDecorator >
        );
    };


    return (
        <>
            <View style={styles.imageContainer}>
                <DraggableFlatList
                    data={myRentItems}
                    //   onDragEnd={({ data }) => setImages(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View >


        </>

    )
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        textBreakStrategy: 'simple'
    },
    rowButt: {
        fontSize: 20
    },
    galleryButton: {
        margin: 8
    },
    title: {
        fontSize: 22,
        color: "black",
        marginHorizontal: 8
    },
    tinyLogo: {
        width: 120,
        height: 120,
        margin: 5
    },
    imageContainer: {
        height: screenHeight * 0.53
    },

    errorText: {
        color: "red"
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})