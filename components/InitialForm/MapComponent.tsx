import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Button, StyleSheet, } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapComponent(props) {
    const [region, setRegion] = useState({
        latitude: 46.77597673723042,
        longitude: 23.593140829806252,
    })
    const [radius, setRadius] = useState(1000)
    const [lockedRegion, setLockedRegion] = useState()

    const handleLock = () => {
        setLockedRegion({ ...region })
        if (lockedRegion)
            console.log(lockedRegion)
    }

    const handleSave = () => {
        props.setPoints([...props.points, { ...lockedRegion, radius }]);
        setLockedRegion(null);
    }
    const increaseRadius = () => {
        setRadius(radius * 2);
    }
    const decreaseRadius = () => {
        setRadius(radius / 2);
    }
    const handleCancel = () => {
        setLockedRegion(null);
    }

    useEffect(() => {
        props.points.forEach(x => {
            console.log(x.radius);
        })
    }, [props.points])
    return (
        <>
            <View style={StyleSheet.absoluteFillObject}>

                <MapView style={StyleSheet.absoluteFillObject} provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    onRegionChange={(region) => {
                        setRegion(region)
                    }}
                    initialRegion={{
                        latitude: 46.77597673723042,
                        longitude: 23.593140829806252,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <>
                        {lockedRegion &&
                            <Circle
                                radius={radius}
                                center={lockedRegion}
                                strokeWidth={1}
                                strokeColor={'#1a66ff'}
                                fillColor={'rgba(230,238,255,0.5)'}
                            />
                        }
                        {props.points && props.points.map((point, i) => (
                            <Circle
                                key={"circle" + i}
                                radius={point.radius}
                                center={point}
                                strokeWidth={1}
                                strokeColor={'#1a66ff'}
                                fillColor={'rgba(50,238,10,0.1)'}
                            />
                        ))}
                    </>

                </MapView>
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <Text >o</Text>
                </View>



            </View>
            {!lockedRegion ? (
                <Button title="Add region" onPress={handleLock} />


            ) : <View style={{ flex: 1, flexDirection: "row" }}>

                <View style={{ width: "30%", marginRight: 40 }}>
                    <Button title="Save" onPress={handleSave} />
                </View>

                <View style={{ width: "10%", marginRight: 10 }}>
                    <Button color="grey" title="+" onPress={increaseRadius} />
                </View>

                <View style={{ width: "10%", marginRight: 40 }}>
                    <Button color="black" title="-" onPress={decreaseRadius} />
                </View>

                <View style={{ width: "30%" }}>
                    <Button color={"red"} title="Cancel" onPress={handleCancel} />
                </View>
            </View>}


        </>
    )
}
const styles = StyleSheet.create({
})