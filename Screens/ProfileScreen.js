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

const ProfileScreen = () => {
  const navigation = useNavigation();

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
              />
            </View>
          </View>

          <Pressable
            style={styles.logOutButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.profileName}>Natali Romanova</Text>

          <PostCard
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
          />
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
