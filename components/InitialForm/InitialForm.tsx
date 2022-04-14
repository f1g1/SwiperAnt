import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { RadioButton, TextInput, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapComponent from "./MapComponent";


const CurrencyList = [
    {
        label: "RON",
        value: "ron",
    },
    {
        label: "EUR",
        value: "eur",
    },
    {
        label: "USD",
        value: "usd",
    },
];

const schema = yup.object({
    PriceCategory: yup.number().positive().integer().required(),
    SizeCategory: yup.number().positive().integer().required(),

});

export default function InitialForm({ onSubmit }) {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <KeyboardAwareScrollView>

            <View style={styles.container}>
                <Controller
                    control={control}
                    defaultValue="1"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value} >
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Cheapest</Text>
                                <RadioButton value="0" />
                            </View>
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Moderate</Text>
                                <RadioButton value="1" />
                            </View>
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Expensive</Text>
                                <RadioButton value="2" />
                            </View>
                        </RadioButton.Group>



                    )}
                    name="PriceCategory"
                />
                <Controller
                    control={control}
                    defaultValue="1"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value} >
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Small</Text>
                                <RadioButton value="0" />
                            </View>
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Medium</Text>
                                <RadioButton value="1" />
                            </View>
                            <View style={styles.container1}>
                                <Text style={styles.errorText}>Spatious</Text>
                                <RadioButton value="2" />
                            </View>
                        </RadioButton.Group>
                    )}
                    name="SizeCategory"
                />


            </View>
            <MapComponent />
            {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 10,
        zIndex: 3000
    },
    container: {
        flex: 1,
        backgroundColor: "grey"
    },
    containerMap: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        minHeight: 450,
        backgroundColor: "grey"
    },
    container1: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "black",
    },
    errorText: {
        color: "red"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})