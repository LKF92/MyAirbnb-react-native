import React, { useEffect, useState, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
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
      setErrorMessage("Permission refusée");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  });

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMessage(
        "La géolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device !"
      );
    } else {
      console.log(Constants.isDevice);
      getLocationAsync();
    }
  }, []);

  // console.log(data.rooms) // print undefined (car data n'st pas encore fetch) puis au deuxième render, print l'array data.rooms
  //   const gpsList = data.rooms.map(room => {
  //     return room.loc;
  //   });
  // Ici, data.rooms.map renvoie une erreur car impossible de map sur undefined. Pourtant, le script continue son exécution puisque le deuxième console.log affiche bien l'arrêt (et donc ne s'arrête pas au premier render lorsqu'on essaye de faire undefined.map)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/room?city=paris"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            latitude: location.coords.latitude,
            // latitude: data.city.loc[1],
            longitude: location.coords.longitude,
            // longitude: data.city.loc[0],
            latitudeDelta: 0.15,
            longitudeDelta: 0.15
          }}
        >
          {/* <Marker cordinate={{longitude: location.coords.longitude, latitude: location.coords.latitude}}/> */}
          {location &&
            data.rooms.map(room => {
              return (
                <Marker
                  key={room.loc[1] + room.loc[0]}
                  coordinate={{ latitude: room.loc[1], longitude: room.loc[0] }}
                  onPress={() => navigation.navigate("Room", { id: room._id })}
                >
                  <Image
                    source={{ uri: room.photos[0] }}
                    style={styles.markerImg}
                  />
                </Marker>
              );
            })}
        </MapView>
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
