import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, Image, Platform } from "react-native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

export default function RoomCard({ room }) {
  const buildStars = () => {
    let iconName;
    Platform.OS === "ios" ? (iconName = "ios-star") : "md-star";
    return (
      <View style={styles.row}>
        {[...Array(5)].map((elem, index) => (
          <Ionicons
            key={index}
            name={iconName}
            size={18}
            color={index < room.ratingValue ? colors.gold : colors.lightGrey}
            style={styles.star}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image
          resizeMode="cover"
          style={styles.roomPicture}
          source={{ uri: room.photos[0] }}
        />
        <Text style={styles.price}>{room.price}€</Text>
      </View>
      <View style={(styles.row, styles.details)}>
        <View>
          <Text numberOfLines={1} style={styles.roomTitle}>
            {room.title}
          </Text>
          <View style={styles.row}>
            {buildStars()}
            <Text style={styles.secondaryText}>{room.reviews} reviews</Text>
          </View>
        </View>
        <Image
          resizeMode="cover"
          source={{ uri: room.user.account.photos[0] }}
          style={styles.profilePicture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,

    marginBottom: 25
  },
  imgContainer: {
    position: "relative"
  },
  roomPicture: {
    width: 370,
    height: 200
  },
  price: {
    color: "white",
    backgroundColor: "black",
    fontSize: 30,
    padding: 10,
    position: "absolute",
    bottom: 10
  },
  roomTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: "300",
    marginBottom: 7
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10
  },
  secondaryText: {
    color: colors.grey,
    fontSize: 17,
    fontWeight: "300",
    marginHorizontal: 10
  },
  star: {
    marginRight: 3
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2
  }
});
