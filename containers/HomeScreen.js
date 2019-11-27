import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import colors from "../colors";
import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      console.log(response.data.rooms);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => String(item._id)}
        data={data.rooms}
        renderItem={({ item }) => {
          return <RoomCard room={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    padding: 20
  },
  marginVertical: {
    marginVertical: 30
  },

  center: {
    alignItems: "center"
  }
});

{
  /* 
  const navigation = useNavigation();
   <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */
}
