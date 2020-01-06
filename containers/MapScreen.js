import React, { useEffect, useState, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator, Image, Platform, Text } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const getLocationAsync = useCallback(async () => {
    // We need to ask permission to use to get his GPS coordinates
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission denied");
      setErrorMessage("Permission denied");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  });
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMessage("Geolocation does not work on android simulator. Try on your mobile!");
    } else {
      console.log("is running on mobile device ?", Constants.isDevice);
      getLocationAsync();
    }
  }, []);

  const fetchData = async () => {
    const response = await axios.get("https://airbnb-api.herokuapp.com/api/room?city=paris");
    try {
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("from fetchData error : ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : data ? (
        <MapView
          style={styles.map}
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            // focus is on Paris since the accomodations are listed there
            // latitude: location.coords.latitude,
            latitude: data.city.loc[1],
            // longitude: location.coords.longitude,
            longitude: data.city.loc[0],
            latitudeDelta: 0.15,
            longitudeDelta: 0.15
          }}
        >
          {data.rooms.map(room => (
            <Marker
              key={room.loc[1] + room.loc[0]}
              coordinate={{ latitude: room.loc[1], longitude: room.loc[0] }}
              onPress={() => navigation.navigate("Room", { id: room._id })}
            >
              <Image source={{ uri: room.photos[0] }} style={styles.markerImg} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text>bugggg</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 500
  },
  loading: {
    justifyContent: "center",
    alignItems: "center"
  },
  markerImg: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
});
