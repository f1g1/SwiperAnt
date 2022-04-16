import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { RadioButton, TextInput, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapComponent from "./MapComponent";


const schema = yup.object({
    PriceCategory: yup.number().positive().integer().required(),
    SizeCategory: yup.number().positive().integer().required(),

});

export default function InitialForm({ onSubmit }) {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const [points, setPoints] = useState([])


    return (
        <KeyboardAwareScrollView>
            <View style={styles.containerMap} >
                <MapComponent setPoints={setPoints} points={points} />
            </View>
            <View>
                <View style={styles.container}>
                    <Text style={styles.groupText}>
                        What price are you willing to pay?
                    </Text>
                    <Controller
                        control={control}
                        defaultValue="1"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RadioButton.Group onValueChange={onChange} value={value} >
                                <View >
                                    <Text>Cheapest</Text>
                                    <RadioButton value="0" />
                                </View>
                                <View >
                                    <Text >Moderate</Text>
                                    <RadioButton value="1" />
                                </View>
                                <View >
                                    <Text >Expensive</Text>
                                    <RadioButton value="2" />
                                </View>
                            </RadioButton.Group>



                        )}
                        name="PriceCategory"
                    />
                    <Text style={styles.groupText}>
                        How big do you want your space to be?
                    </Text>
                    <Controller
                        control={control}
                        defaultValue="1"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RadioButton.Group onValueChange={onChange} value={value}  >
                                <View  >
                                    <Text >Small</Text>
                                    <View style={{ flex: 1 }}>
                                        <RadioButton.Android value="0" />
                                    </View>

                                </View>
                                <View >
                                    <Text >Medium</Text>
                                    <RadioButton value="1" />
                                </View>
                                <View >
                                    <Text>Huge</Text>
                                    <RadioButton value="2" />
                                </View>
                            </RadioButton.Group>
                        )}
                        name="SizeCategory"
                    />
                </View>

            </View>

        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    groupText: {
        borderBottomWidth: 1,
        marginBottom: 5,
        fontSize: 20
    },
    button: {
        position: "absolute",
        top: 10,
        zIndex: 3000
    },
    container: {
        flex: 1,
        backgroundColor: "grey",
        paddingHorizontal: 10
    },
    containerMap: {
        flex: 1,
        minHeight: 430,
        backgroundColor: "grey"
    },
    container1: {
        width: 100
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