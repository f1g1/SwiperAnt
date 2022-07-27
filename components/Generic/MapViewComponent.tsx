import React from 'react'
import { StyleSheet } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapViewComponent({ items }) {
    return (
        <MapView style={StyleSheet.absoluteFillObject} provider={PROVIDER_GOOGLE} // remove if not using Google Maps

            initialRegion={{
                latitude: items[0].location.latitude,
                longitude: items[0].location.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >

            {items && items?.length > 0 && items.map((item, i) => (
                <Circle
                    key={"circle" + i}
                    radius={item.location.radius}
                    center={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                    }}
                    strokeWidth={1}
                    strokeColor={'#1a66ff'}
                    fillColor={'rgba(230,238,255,0.8)'} />
            ))}
        </MapView>
    )
}
const styles = StyleSheet.create({})