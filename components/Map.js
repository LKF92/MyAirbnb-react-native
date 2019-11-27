import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";

export default function Map({ data }) {
  return (
    <MapView
      style={styles.map}
      provider="google"
      initialRegion={{
        latitude: data.city.loc[1],
        longitude: data.city.loc[0],
        latitudeDelta: 0.035,
        longitudeDelta: 0.035
      }}
    >
      <MapView.Marker
        coordinate={{
          latitude: data.city.loc[1],
          longitude: data.city.loc[0]
        }}
      />
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    height: 400,
    marginVertical: 30
  }
});
