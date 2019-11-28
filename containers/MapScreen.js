import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import axios from "axios";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
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
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
        >
          {/* <MapView.Marker
        coordinate={{
          latitude: data.city.loc[1],
          longitude: data.city.loc[0]
        }}
      /> */}
        </MapView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 500,
    marginVertical: 30
  },
  loading: {
    justifyContent: "center",
    alignItems: "center"
  }
});
