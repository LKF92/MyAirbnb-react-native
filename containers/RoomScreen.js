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
import RoomPicture from "../components/RoomPicture";
import RoomInfo from "../components/RoomInfo";
import Map from "../components/Map";

export default function RoomScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("initialState");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room/" + params.id
      );
      setData(response.data);
      //   console.log(response.data);
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
        <ScrollView>
          <ActivityIndicator />
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View>
              <View style={styles.roomPicture}>
                <RoomPicture room={data} height="100%" />
              </View>
              <View style={styles.roomInfo}>
                <RoomInfo room={data} />
                <Text numberOfLines={3} style={styles.description}>
                  {data.description}
                </Text>
              </View>
              <Map data={data} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  roomPicture: {
    height: "50%"
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
