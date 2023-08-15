import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import RomanovaImg from "../assets/images/userRomanova.jpg";
import PostCard from "../components/PostCard";
import Forest from "../assets/images/forest.jpg";
import Sunset from "../assets/images/sunset.jpg";
import oldHouse from "../assets/images/oldHouse.jpg";


const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenMainContent}>
        <View style={styles.userBlock}>
          <View style={styles.userBlockPhotoWrap}>
            <Image source={RomanovaImg} />
          </View>
          <View style={styles.userBlockInfo}>
            <Text style={styles.userBlockName}>Natali Romanova</Text>
            <Text style={styles.userBlockEmail}>
              email@example.com
            </Text>
          </View>
        </View>

        <PostCard
          pictureSource={Forest}
          title="Ліс"
          comments="0"
          likes="0"
          location="Ivano-Frankivs'k Region, Ukraine"
          hideLikes
        />
        <PostCard
          pictureSource={Sunset}
          title="Захід на Чорному морі"
          comments="0"
          likes="0"
          location="Odessa Region, Ukraine"
        />
        <PostCard
          pictureSource={oldHouse}
          title="Старий будиночок у Венеції"
          comments="0"
          likes="0"
          location="Venice Region, Italy"
          hideLikes
        />
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
});

export default PostsScreen;
