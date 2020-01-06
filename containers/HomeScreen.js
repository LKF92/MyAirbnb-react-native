import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import colors from "../colors";
import RoomPicture from "../components/RoomPicture";
import RoomInfo from "../components/RoomInfo";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://airbnb-api.now.sh/api/room?city=paris");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <FlatList
            style={styles.container}
            keyExtractor={item => String(item._id)}
            data={data.rooms}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Room", { id: item._id });
                    }}
                  >
                    <View style={styles.roomPicture}>
                      <RoomPicture room={item} height={200} />
                    </View>
                  </TouchableOpacity>
                  <RoomInfo room={item} />
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20
  },
  card: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: 25
  },
  roomPicture: {
    width: "100%"
  }
});
