import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PhotoBG from "../assets/images/bgrPhoto.png";
import Avatar from "../assets/images/userRomanovaAva.jpg";
import Forest from "../assets/images/forest.jpg";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import { auth, db } from "../config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
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

  useEffect(() => {
    const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        // console.log(postsList);
        setPosts(postsList);
        return postsList;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    getDataFromFirestore();
  }, []);

  const removeImage = (e) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserData([]);
    navigation.navigate("Login");
  };

  const handleLikes = async (postId, postIndex) => {
    try {
      const updatedPosts = [...posts];
      const currentLikes = updatedPosts[postIndex].data.likes;
      const updatedLikes = currentLikes + 1;

      const docRef = doc(collection(db, "posts"), postId);
      await updateDoc(docRef, {
        likes: updatedLikes,
      });

      updatedPosts[postIndex].data.likes = updatedLikes;
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={PhotoBG}
        resizeMode="cover"
        style={styles.bgimage}
      >
        <ScrollView contentContainerStyle={styles.profileAreaBlock}>
          <View>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPhotoWrap}>
                <Image source={Avatar} />
              </View>
              <AntDesign
                name="closecircleo"
                size={25}
                color="#BDBDBD"
                style={styles.removeIco}
                onPress={removeImage}
              />
            </View>
          </View>
          <Pressable style={styles.logOutButton} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.profileName}>
            {userData.displayName && userData.displayName}
          </Text>
          {posts && (
            <View>
              {posts.map((postItem, index) => (
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
                      defaultSource={Forest}
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
                          color={postItem.data.comments.length !== 0 ? "#FF6C00" : "#BDBDBD"}
                          style={{ marginRight: 6, paddingTop: 6 }}
                        />
                      </Pressable>
                      <Text style={styles.pictureStatistics}>
                        {postItem.data.comments.length}
                      </Text>
                    </View>
                    <View style={styles.pictureLikes}>
                      <AntDesign
                        name="like2"
                        size={24}
                        color="#FF6C00"
                        style={{ marginRight: 6 }}
                        onPress={() => handleLikes(postItem.id, index)}
                      />
                      <Text style={styles.pictureStatistics}>
                        {postItem.data.likes}
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
                        onPress={() => navigation.navigate("Map")}
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    justifyContent: "center",
  },
  profileAreaBlock: {
    paddingTop: 32,
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 192,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
    top: -60,
    marginBottom: -28,
  },
  avatarPhotoWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  removeIco: {
    zIndex: 100,
    position: "absolute",
    right: -12.5,
    bottom: 14,
    backgroundColor: "white",
    borderRadius: 12.5,
    overflow: "hidden",
  },
  logOutButton: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  profileName: {
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.3,
    color: "#212121",
    marginTop: 2,
  },
  pictureCard: {
    marginTop: 32,
  },
  pictureWrap: {
    borderRadius: 8,
    overflow: "hidden",
  },
  nameOfPicture: {
    marginTop: 8,
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  pictureInfo: {
    flexDirection: "row",
    marginTop: 8,
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
  pictureLikes: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
