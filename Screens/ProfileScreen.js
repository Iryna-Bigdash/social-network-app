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
import Sunset from "../assets/images/sunset.jpg";
import oldHouse from "../assets/images/oldHouse.jpg";

import PostCard from "../components/PostCard";

import React, { useState, useEffect } from "react";
import { auth, db } from "../config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { signOut, onAuthStateChanged } from "firebase/auth";

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

        console.log(postsList)
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

          <Pressable
            style={styles.logOutButton}
            // onPress={() => navigation.navigate("Login")}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </Pressable>

          <Text style={styles.profileName}>
            {userData.displayName && userData.displayName}
          </Text>

          {posts && (
            <View>
              {posts.map((postItem, index) => (
                <PostCard
                  key={postItem.id}
                  pictureSource={{ uri: postItem.data.previewImage }}
                  title={postItem.data.title}
                  comments={postItem.data.comments.length}
                  likes={postItem.data.likes}
                  location={postItem.data.locationText}
                  onLike={() => handleLikes(postItem.id, index)}
                  onComment={() =>
                    navigation.navigate("Comments", {
                      postId: postItem.id,
                    })
                  }
                />  
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
 });




    {/* <PostCard
             pictureSource={Forest}
             title="Ліс"
             comments="8"
             likes="153"
             location="Ukraine"
           />
           <PostCard
             pictureSource={Sunset}
             title="Захід на Чорному морі"
             comments="3"
             likes="200"
             location="Ukraine"
           />
           <PostCard
             pictureSource={oldHouse}
             title="Старий будиночок у Венеції"
             comments="5"
             likes="200"
             location="Italy"
           /> */}


