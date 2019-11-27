import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Image, Platform } from "react-native";

export default function RoomPicture({ room, height }) {
  return (
    <View style={styles.imgContainer}>
      <Image
        resizeMode="cover"
        style={{ ...styles.roomPicture, height: height }}
        source={{ uri: room.photos[0] }}
      />
      <Text style={styles.price}>{room.price}€</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    position: "relative"
  },
  roomPicture: {
    width: "100%"
  },
  price: {
    color: "white",
    backgroundColor: "black",
    fontSize: 30,
    padding: 10,
    position: "absolute",
    bottom: 10
  }
});
