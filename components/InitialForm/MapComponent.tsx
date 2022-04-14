import React, { useEffect, useState } from 'react'
import { PointPropType, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Button, Alert, StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapComponent() {
    const [points, setPoints] = useState([])
    const [region, setRegion] = useState({})
    const [radius, setRadius] = useState(1000)
    const [lockedRegion, setLockedRegion] = useState()

    const handleSubmit = () => {
        setLockedRegion({ ...region, radius })
        if (lockedRegion)
            console.log(lockedRegion)
    }
    const increaseRadius = () => {
        setRadius(radius * 2);
    }
    const decreaseRadius = () => {
        setRadius(radius / 2);
    }

    useEffect(() => {
        console.log(points);
    }, [points])

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
                    {lockedRegion &&

                        <Circle
                            radius={radius}
                            center={lockedRegion}
                            strokeWidth={1}
                            strokeColor={'#1a66ff'}
                            fillColor={'rgba(230,238,255,0.5)'}

                        />
                    }
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
                    <Text style={{ color: "red" }}>x</Text>
                </View>



            </View>
            {!lockedRegion ? (
                <Button title="Lock" onPress={handleSubmit} />


            ) : <View style={{ flex: 1, flexDirection: "row" }}>

                <View style={{ width: "40%" }}>
                    <Button title="Save" onPress={handleSubmit} />

                </View>

                <View style={{ width: "20%" }}>
                    <Button color="grey" title="+" onPress={increaseRadius} />
                    <Button color="black" title="-" onPress={decreaseRadius} />
                </View>
                <View style={{ width: "40%" }}>
                    <Button color={"red"} title="Cancel" onPress={handleSubmit} />

                </View>


            </View>}


        </>
    )
}
const styles = StyleSheet.create({
})