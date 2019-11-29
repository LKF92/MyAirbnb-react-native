import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Button
} from "react-native";
import { AsyncStorage } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { isLoading } from "expo-font";

export default function ProfileScreen({ setToken }) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/user/" + userId,
          {
            headers: {
              Authorization: "Bearer " + userToken
            }
          }
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View>
            <Text>Description :</Text>
            <Text>{data.account.description}</Text>
          </View>
          <Button
            title="Log Out"
            onPress={() => {
              setToken(null);
            }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  }
});
