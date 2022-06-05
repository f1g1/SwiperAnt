import React, { useEffect, useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PostRentItem, PutRentItem } from "../../services/RentItemService";
import ImageForm from "./ImageForm";
import { SafeAreaView } from "react-native-safe-area-context";
import MapComponent from "../InitialForm/MapComponent";


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
    images: yup.array().min(3).required('At least 3 images are required'),
    location: yup.object().required(),
    title: yup.string().required()
        .test('len', 'Must be less than 100 characters', val => val?.length <= 100),
    description: yup.string()
        .test('len', 'Must be less than 500 characters', val => val?.length <= 500),
    price: yup.number().positive().integer().required('Price is required'),
    currency: yup.string().required(),
    surface: yup.number().positive("Surface needs ").required("Surface needs "),
    rooms: yup.number().positive().integer().required(),
    type: yup.string().required(),
    level: yup.string().required(),
    city: yup.string().required(),
    neighborhood: yup.string().required(),
});

export default function AddItemForm({ givenItem, setGivenItem }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [imagesCount, setImagesCount] = useState(0)
    const [points, setPoints] = useState([])
    const [openGallery, setOpenGallery] = useState(false)
    const [openMap, setOpenMap] = useState(false)
    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        console.log("@submitCalled", data)
        if (givenItem) {
            PutRentItem({ ...data }).then(() =>
                setGivenItem()
            );
        }
        else
            PostRentItem({ ...data })

    };

    useEffect(() => {
        if (givenItem) {
            reset(givenItem)
            setImagesCount(givenItem.images.length)

        }
    }, [givenItem])


    const HandleImageChange = (onChange, images) => {
        onChange(images)
        setImagesCount(images.length)
    }
    return (
        <SafeAreaView style={styles.container}>
            {openMap &&
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.containerMap}>
                            <MapComponent setPoints={onChange} points={value ? [value] : []} single setOpenMap={setOpenMap} />
                        </View>
                    )}
                    name="location"
                />}

            {openGallery &&
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ImageForm images={value || []} setImages={x => HandleImageChange(onChange, x)} setOpen={setOpenGallery} />
                    )}
                    name="images"
                />}
            {openGallery || openMap ||
                <KeyboardAwareScrollView >
                    {/* {imagesCount < 3 &&
                        <Text style={styles.errorText}>At least 3 images are needed, add {3 - imagesCount} images to submit entry </Text>} */}
                    <Button title={"Open Gallery " + "( " + imagesCount + " photos added)"} onPress={() => setOpenGallery(true)} />
                    <Text style={styles.errorText}>{errors.Images?.message}</Text>
                    <Button title={"Open Map"} onPress={() => setOpenMap(true)} />
                    <Text style={styles.errorText}>{errors.Location?.message}</Text>
                    <Controller
                        control={control}
                        rules={{
                            maxLength: 10,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Title'"
                                placeholderTextColor={"grey"}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                label={"Title"}
                            />
                        )}
                        name="title"
                    />
                    <Text style={styles.errorText}>{errors.Title?.message}</Text>

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 500,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={"grey"}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                label={"Description"}
                            />
                        )}
                        name="description"
                    />
                    <Text style={styles.errorText}>{errors.Description?.message}</Text>
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
                                value={value?.toString()}
                                label={"Price"}
                            />
                        )}
                        name="price"
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
                                setValue={(v) => setValue("currency", v)}
                            />
                        )}
                        name="currency"
                    />
                    <Text style={styles.errorText}>{errors.Currency?.message}</Text>


                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType='number-pad'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value?.toString()}
                                label={"Surface (MP)"}
                            />
                        )}
                        name="surface"
                    />
                    <Text style={styles.errorText}>{errors.Surface && "Surface must be a positive number"}</Text>

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                keyboardType='number-pad'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value?.toString()}
                                label={"Rooms Number"}
                            />
                        )}
                        name="rooms"
                    />
                    <Text style={styles.errorText}>{errors.Rooms && "Rooms number must be a positive number"}</Text>

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
                        name="type"
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
                        name="level"
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
                        name="city"
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
                        name="neighborhood"
                    />

                    <Text style={styles.errorText}>{errors.Neighborhood?.message}</Text>

                    <Button title={givenItem ? "Save Edit" : "Submit"} onPress={handleSubmit(onSubmit)} />

                    {givenItem && <View style={styles.buttonGiven}>
                        <Button title={"Cancel"} color="red" onPress={() => setGivenItem()} />
                    </View>}
                </KeyboardAwareScrollView >
            }

        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        padding: 8,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
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
    containerMap: {
        minHeight: "100%",
        backgroundColor: "grey"
    },
    buttonGiven: {
        marginTop: 10
    }
})