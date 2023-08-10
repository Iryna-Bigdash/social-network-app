import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";


export default function App() {

  const [fontsLoaded] = useFonts({
        "r-bolt": require("./fonts/Roboto-Bold.ttf"),
        "r-medium": require("./fonts/Roboto-Medium.ttf"),
        "r-regular": require("./fonts/Roboto-Regular.ttf"),
      });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
