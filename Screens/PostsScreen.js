import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import { db, auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import RomanovaImg from "../assets/images/userRomanova.jpg";
import oldHouse from "../assets/images/oldHouse.jpg";

const PostsScreen = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const user = auth.currentUser;
        setUserData(user);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getDataFromFirestore = async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));
          const postsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setPosts(postsList);
          return postsList;
        } catch (error) {
          throw error;
        }
      };

      getDataFromFirestore();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenMainContent}>
        <View style={styles.userBlock}>
          <View style={styles.userBlockPhotoWrap}>
            <Image source={RomanovaImg} />
          </View>
          <View style={styles.userBlockInfo}>
            <Text style={styles.userBlockName}>
              {userData.displayName && userData.displayName}
            </Text>
            <Text style={styles.userBlockEmail}>{userData.email}</Text>
          </View>
        </View>
        <View>
          {posts && (
            <View>
              {posts.map((postItem) => (
                <View style={styles.pictureCard} key={postItem.id}>
                  <View style={styles.pictureWrap}>
                    <Image
                      source={{ uri: postItem.data.previewImage }}
                      style={{
                        width: 343,
                        height: 240,
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                      resizeMode="cover"
                      defaultSource={oldHouse}
                      onError={(error) =>
                        console.log("Image loading error:", error)
                      }
                    />
                  </View>
                  <Text style={styles.nameOfPicture}>
                    {postItem.data.title}
                  </Text>
                  <View style={styles.pictureInfo}>
                    <View style={styles.pictureComments}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: postItem.id,
                          })
                        }
                      >
                        <MaterialCommunityIcons
                          name="message-reply"
                          size={24}
                          color={
                            postItem.data.comments.length !== 0
                              ? "#FF6C00"
                              : "#BDBDBD"
                          }
                          style={{ marginRight: 6, paddingTop: 6 }}
                        />
                      </Pressable>
                      <Text style={styles.pictureStatistics}>
                        {postItem.data.comments.length}
                      </Text>
                    </View>
                    <View style={styles.pictureLocation}>
                      <AntDesign
                        name="enviromento"
                        size={24}
                        color="#BDBDBD"
                        style={{ marginRight: 4 }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", { postId: postItem.id })
                        }
                      >
                        <Text
                          style={[styles.pictureStatistics, styles.underline]}
                        >
                          {postItem.data.locationText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenMainContent: {
    paddingTop: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 24,
  },
  userBlock: {
    height: 60,
    flexDirection: "row",
    marginBottom: 16,
    width: 343,
  },
  userBlockPhotoWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  userBlockInfo: {
    paddingLeft: 8,
    justifyContent: "center",
  },
  userBlockName: {
    fontFamily: "r-bolt",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    lineHeight: 15,
    color: "#212121",
  },
  userBlockEmail: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  pictureCard:{
    marginBottom: 32
  },
  pictureWrap:{
    marginBottom: 8
  },
  nameOfPicture: {
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  pictureInfo: {
    flexDirection: "row",
  },
  pictureComments: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    alignSelf: "center",
  },
  pictureStatistics: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  pictureLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
