import React from 'react'
import { StyleSheet } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

export default function OneCircleMapComponent({location}) {
    return (
        location &&
        <MapView style={StyleSheet.absoluteFillObject} provider={PROVIDER_GOOGLE} // remove if not using Google Maps

            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
            <Circle
                radius={location.radius}
                center={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
                fillColor={'rgba(230,238,255,0.8)'} />

        </MapView>
    )
}
const styles = StyleSheet.create({})