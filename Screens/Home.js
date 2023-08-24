import React from "react";
import { View } from "react-native";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CustomHeader from "../components/Header";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const Home = ({ route, navigation }) => {
  
  const routeName = getFocusedRouteNameFromRoute(route) ?? "PostsScreen";

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => {
        return {
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingBottom: 20,
            height: 83,
          },
          tabBarActiveTintColor: "#FF6C00",
          tabBarInactiveTintColor: "#212121",
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "PostsScreen") {
              let iconName = focused ? "appstore1" : "appstore-o";
              let iconSize = focused ? 35 : 25;
              return (
                <AntDesign name={iconName} color={color} size={iconSize} />
              );
            } else if (route.name === "CreatePostsScreen") {
              let icoColor = focused ? "#BDBDBD" : "#ffffff";
              let bgColor = focused ? "#F6F6F6" : "#FF6C00";
              return (
                <View
                  style={{
                    backgroundColor: bgColor,
                    borderRadius: 20,
                    height: 40,
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {focused ? (
                    <Feather name="trash-2" color={icoColor} size={size} />
                  ) : (
                    <Octicons name="plus" color={icoColor} size={size} />
                  )}
                </View>
              );
            } else if (route.name === "ProfileScreen") {
              let iconName = focused ? "person" : "person-outline";
              let iconSize = focused ? 35 : 25;
              return <Ionicons name={iconName} color={color} size={iconSize} />;
            }
          },
        };
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          header: ({ navigation, route, options }) => {
            const title = "Пубілкації";
            return <CustomHeader title={title} />;
          },
        }}
      />

      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          header: ({ navigation, route, options }) => {
            const title = "Створити публікацію";
            return <CustomHeader title={title} cameFrom={routeName} />;
          },
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
