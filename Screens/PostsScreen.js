import { View, Text, StyleSheet, Image } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import RomanovaImg from "../assets/images/userRomanova.jpg";


const PostsScreen = () => {
  return (
<View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}></View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Публікації</Text>
        </View>
      </View>
      <ScrollView style={styles.mainContext}>
        <View style={styles.userWrap}>
          <View style={styles.userPhotoWrap}>
          <Image source={RomanovaImg} />
          </View>
          <View style={styles.infoWrap}>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>n.romanova@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 33,
    minHeight: 33,
    paddingBottom: 11,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
  },
  headerLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  headerRight: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
  headerTitle: {
    fontFamily: "r-medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  mainContext: {
    marginBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 22,
  },
  userWrap: {
    height: 60,
    flexDirection: "row",
    marginBottom: 16,
  },

  userPhotoWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  infoWrap: {
    paddingLeft: 8,
    justifyContent: "center",
  },

  name: {
    fontFamily: "r-bold",
    fontSize: 13,
    lineHeight: 15,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    fontFamily: "r-regular",
    fontSize: 11,
    lineHeight: 13,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default PostsScreen;