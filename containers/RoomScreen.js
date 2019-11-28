import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import RoomInfo from "../components/RoomInfo";
import Map from "../components/Map";
import PhotoSwipper from "../components/PhotoSwipper";

export default function RoomScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [isTextDisplayed, setIsTextDisplayed] = useState(false);
  const [data, setData] = useState("initialState");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room/" + params.id
      );
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
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.roomPicture}>
            <PhotoSwipper room={data} />
            {/* <RoomPicture room={data} height="100%" /> */}
          </View>
          <View style={styles.roomInfo}>
            <RoomInfo room={data} />
            <Text
              numberOfLines={isTextDisplayed ? 0 : 3}
              style={styles.description}
              onPress={() => setIsTextDisplayed(!isTextDisplayed)}
            >
              {data.description}
            </Text>
          </View>
          <Map data={data} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  roomPicture: {
    height: 300
  },
  roomInfo: {
    paddingHorizontal: 20
  },
  description: {
    lineHeight: 30,
    fontSize: 20,
    fontWeight: "300"
  }
});
