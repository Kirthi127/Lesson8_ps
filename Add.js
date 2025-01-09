import React, { useState } from "react";
import { StatusBar, View, Button, Text, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Add = ({ navigation, route }) => {
    const [pokemon, setPokemon] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [type, setType] = useState("Fantasy");

    const saveData = async (newData) => {
        await AsyncStorage.setItem("bookdata1", JSON.stringify(newData));
        navigation.navigate("Home");
    };

    return (
        <View>
            <StatusBar />
            <Text>Book Name:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setPokemon} value={pokemon} />
            <Text>Image URL:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setImageUrl} value={imageUrl} />
            <RNPickerSelect
                onValueChange={setType}
                items={[
                    { label: "Fantasy", value: "Fantasy" },
                    { label: "Romantic", value: "Romantic" },
                ]}
            />
            <Button
                title="Submit"
                onPress={() => {
                    const mydata = JSON.parse(route.params.datastring);
                    const newItem = { key: pokemon, imageUrl, ISBN: "New ISBN", copies: "1" };
                    const sectionIndex = type === "Fantasy" ? 1 : 0;
                    mydata[sectionIndex].data.push(newItem);
                    saveData(mydata);
                }}
            />
        </View>
    );
};

export default Add;
