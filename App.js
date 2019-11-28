import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import MapScreen from "./containers/MapScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SettingsScreen from "./containers/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={() => null} />
        ) : userToken === null ? (
          // No token found, user isn't signed in
          <Stack.Screen name="SignIn" options={{ header: () => null }}>
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
        ) : (
          // User is signed in
          <Stack.Screen name="Tab" options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                // This allows us to configure all Tab.Screen under this Tab.Navigator
                // We could have also chose the `tabBarIcon` in each Tab.Screen
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "Settings") {
                        iconName = `ios-options`;
                      } else if (route.name === "Home") {
                        iconName = `ios-home`;
                      } else if (route.name === "Map") {
                        iconName = "md-map";
                      }
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    title: route.name === "undefined" ? "Home" : route.name // known issue : route.name shouldn't be undefined
                  };
                }}
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray"
                }}
              >
                <Tab.Screen>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: colors.red },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{ title: "Room detail" }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* <Tab.Screen>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Map"
                        options={{
                          title: "Map Result",
                          headerStyle: { backgroundColor: colors.red },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <MapScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{ title: "Room detail" }}
                      >
                        {() => <RoomScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen> */}
                <Tab.Screen name="Settings">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
