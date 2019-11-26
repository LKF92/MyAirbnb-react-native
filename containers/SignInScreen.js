import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        {Platform.OS === "ios" ? (
          <Ionicons
            name="ios-home"
            size={100}
            color="white"
            style={styles.marginVertical}
          />
        ) : (
          <Ionicons
            name="md-home"
            size={100}
            color="white"
            style={styles.marginVertical}
          />
        )}

        <Text style={{ ...styles.welcome }}>Welcome</Text>

        <View style={styles.hr}>
          <TextInput
            placeholder="name@airbnb-api.com"
            placeholderTextColor="white"
            style={styles.textInput}
            selectionColor="white"
          />
        </View>
        <View style={styles.hr}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={styles.textInput}
            secureTextEntry={true}
            selectionColor="white"
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          mode="contained"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        >
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.red,
    alignItems: "center",
    flex: 1
  },
  marginVertical: {
    marginVertical: 30
  },
  welcome: {
    color: "white",
    fontSize: 50,
    marginVertical: 20
  },
  center: {
    alignItems: "center"
  },
  textInput: {
    paddingHorizontal: 10,
    color: "white"
  },
  hr: {
    paddingBottom: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 15,
    width: 300
  },
  btn: {
    marginVertical: 30,
    backgroundColor: "white",
    padding: 5,
    color: colors.red,
    borderRadius: 30,
    width: 125
  },
  btnText: {
    fontSize: 20,
    padding: 7,
    color: colors.red,
    textAlign: "center"
  }
});
