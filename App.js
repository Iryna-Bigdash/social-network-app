import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import PostScreen from "./Screens/PostsScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "r-bolt": require("./fonts/Roboto-Bold.ttf"),
    "r-medium": require("./fonts/Roboto-Medium.ttf"),
    "r-regular": require("./fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Registration">
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> 

        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{ headerShown: false }}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
