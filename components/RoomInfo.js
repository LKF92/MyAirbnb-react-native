import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Platform } from "react-native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

export default function RoomInfo({ room }) {
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
    <View style={styles.details}>
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
  );
}
const styles = StyleSheet.create({
  roomTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: "300",
    marginBottom: 7
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
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
