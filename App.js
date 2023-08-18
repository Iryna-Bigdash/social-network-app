import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostScreen";
import ProfileScreen from "./Screens/ProfileScreen";

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
<Provider store={store}>
<PersistGate persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: true }} />
        <Stack.Screen name="PostsScreen" component={PostsScreen} />
        <Stack.Screen name="CreatePosts" component={CreatePostsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
        </Provider>
  );
}
