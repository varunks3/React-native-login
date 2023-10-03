import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isGridView, setisGridView] = useState(true);
  useEffect(() => {
    async function fetch_data() {
      try {
        let res = await axios.get("http://10.0.2.2:8080/images");
        setFilteredData(res.data);
        setAllData(res.data);
      } catch (error) {
        // console.log(error)
      }
    }
    fetch_data();
  }, []);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = allData.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(allData);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `data:image/jpeg;base64,${Buffer.from(
              item.data.data,
              "utf-8"
            ).toString("base64")}`,
          }}
          resizeMode="cover"
        />
        <Text style={styles.itemStyle}>{item.description.toUpperCase()}</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
        />
        <Button
          onPress={() => setisGridView(!isGridView)}
          title={isGridView ? 'Switch to List View' : 'Switch to Grid View'}
          color="#841584"
        />
        {isGridView ? (
          <FlatList
            data={filteredData}
            key={"_"}
            keyExtractor={(item) => "_" + item._id}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            numColumns={3}
          />
        ) : (
          <FlatList
            data={filteredData}
            key={"#"}
            keyExtractor={(item) => "#" + item._id}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            numColumns={1}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
  },
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    // flexDirection: "row",
  },
  image: {
    flex: 1,
  },
});

export default Search;
