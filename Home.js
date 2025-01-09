import React, { useState } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pokemonImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMydata] = useState([]);

    const initializeData = async () => {
        let datastr = await AsyncStorage.getItem("bookdata1");
        if (datastr !== null) {
            setMydata(JSON.parse(datastr));
        } else {
            setMydata(datasource);
        }
    };

    if (!mydata.length) {
        initializeData();
    }

    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => {
                navigation.navigate("Edit", {
                    index,
                    type: section.title,
                    pokemon: item.key,
                    num: item.ISBN,
                    own: item.copies,
                    imageUrl: item.imageUrl,
                    datastring: JSON.stringify(mydata),
                });
            }}
        >
            <View style={styles.listItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.pokemonImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{item.key}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
                    <Text style={styles.textStyle}>Copies Owned: {item.copies}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Book"
                onPress={() => {
                    navigation.navigate("Add", { datastring: JSON.stringify(mydata) });
                }}
            />
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
                )}
            />
        </View>
    );
};

export default Home;
