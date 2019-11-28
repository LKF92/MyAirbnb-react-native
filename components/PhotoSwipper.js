import React, { Component } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import colors from "../colors";
const { width } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },

  image: {
    width,
    flex: 1
  },
  buttonText: {
    color: colors.lightGrey,
    fontSize: 70
  }
};

export default class PhotoSwipper extends Component {
  render() {
    const photos = this.props.room.photos;
    const photosList = photos.map((photo, index) => {
      return (
        <View key={index} style={styles.slide}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={{ uri: photo }}
          />
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          height={240}
          onMomentumScrollEnd={(e, state, context) =>
            console.log("index:", state.index)
          }
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 2,
                marginVertical: 2
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#000",
                width: 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 2,
                marginVertical: 2
              }}
            />
          }
          paginationStyle={{
            bottom: 5
          }}
          showsButtons={true}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
          loop
        >
          {photosList}
        </Swiper>
      </View>
    );
  }
}
