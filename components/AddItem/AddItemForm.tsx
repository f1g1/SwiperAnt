import React, { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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
    Price: yup.number().positive().integer().required(),
    Currency: yup.string().required(),
    Surface: yup.number().positive().required(),
    Rooms: yup.number().positive().integer().required(),
    Type: yup.string().required(),
    Level: yup.string().required(),
    City: yup.string().required(),
    Neighborhood: yup.string().required(),
});

export default function AddItemForm({ onSubmit }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <View style={styles.container}>
            <View>
                <Controller
                    control={control}
                    rules={{
                        min: 0,
                        required: true,

                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType='number-pad'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            label={"Price"}
                        />
                    )}
                    name="Price"
                />
                <Text style={styles.errorText}>{errors.Price?.message}</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value }, }) => (
                        <DropDown
                            label={"Currency"}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={value}
                            list={CurrencyList}
                            setValue={(v) => setValue("Currency", v)}
                        />
                    )}
                    name="Currency"
                />
                <Text style={styles.errorText}>{errors.Currency?.message}</Text>

            </View>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"Surface"}
                    />
                )}
                name="Surface"
            />
            <Text style={styles.errorText}>{errors.Surface?.message}</Text>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"Rooms Number"}
                    />
                )}
                name="Rooms"
            />
            <Text style={styles.errorText}>{errors.Rooms?.message}</Text>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    placeholder="e.g.'Decomadat'"
                        placeholderTextColor={"grey"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"Type"}
                    />
                )}
                name="Type"
            />
            <Text style={styles.errorText}>{errors.Type?.message}</Text>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="e.g.'3/4'"
                        placeholderTextColor={"grey"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"Level"}
                    />
                )}
                name="Level"
            />
            <Text style={styles.errorText}>{errors.Level?.message}</Text>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                defaultValue="Cluj-Napoca"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        defaultValue="Cluj-Napoca"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"City"}
                    />
                )}
                name="City"
            />
            <Text style={styles.errorText}>{errors.City?.message}</Text>

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}

                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="e.g.'Gheorgheni'"
                        placeholderTextColor={"grey"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label={"Neighborhood"}

                    />
                )}
                name="Neighborhood"
            />
            <Text style={styles.errorText}>{errors.Neighborhood?.message}</Text>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white"
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
    }
})