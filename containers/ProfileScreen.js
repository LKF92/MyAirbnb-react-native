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
  ImageBackground,
  Button
} from "react-native";
import { AsyncStorage } from "react-native";
import axios from "axios";
import UploadPicture from "../components/UploadPicture";
import colors from "../colors";

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
        console.log(
          "RESPONSE.DATA.ACCOUNT -------------->",
          response.data.account.photos
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // TODO Style this section
  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.profilPicture}>
            <Image
              source={{ uri: data.account.photos[0] }}
              style={styles.profilPicture}
            />
          </View>
          <UploadPicture />
          <Text>Description :</Text>
          <Text>{data.account.description}</Text>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white"
  },
  profilPicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "grey",
    borderWidth: 1
  }
});
