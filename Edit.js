import React, { useState } from "react";
import { View, Button, Text, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation, route }) => {
    const mydata = JSON.parse(route.params.datastring);
    const { index, type, pokemon, ISBN, copies, imageUrl } = route.params;

    const [bookName, setBookName] = useState(pokemon);
    const [isbn, setIsbn] = useState(ISBN);
    const [copiesOwned, setCopiesOwned] = useState(copies);
    const [imgUrl, setImgUrl] = useState(imageUrl);

    const saveData = async (newData) => {
        await AsyncStorage.setItem("bookdata1", JSON.stringify(newData));
        navigation.navigate("Home");
    };

    return (
        <View>
            <Text>Book Name:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setBookName} value={bookName} />
            <Text>ISBN:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setIsbn} value={isbn} />
            <Text>Copies Owned:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setCopiesOwned} value={copiesOwned} />
            <Text>Image URL:</Text>
            <TextInput style={{ borderWidth: 1 }} onChangeText={setImgUrl} value={imgUrl} />
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Button
                    title="Save"
                    onPress={() => {
                        const sectionIndex = type === "Fantasy" ? 1 : 0;
                        mydata[sectionIndex].data[index] = {
                            key: bookName,
                            ISBN: isbn,
                            copies: copiesOwned,
                            imageUrl: imgUrl,
                        };
                        saveData(mydata);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        Alert.alert("Are you sure?", "", [
                            {
                                text: "Yes",
                                onPress: () => {
                                    const sectionIndex = type === "Fantasy" ? 1 : 0;
                                    mydata[sectionIndex].data.splice(index, 1);
                                    saveData(mydata);
                                },
                            },
                            { text: "No" },
                        ]);
                    }}
                />
            </View>
        </View>
    );
};

export default Edit;
