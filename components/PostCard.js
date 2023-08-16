import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PostCard = ({ pictureSource, title, comments, likes, location }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.pictureCard}>
      <View style={styles.pictureWrap}>
        <Image source={pictureSource} />
      </View>

      <Text style={styles.nameOfPicture}>{title}</Text>

      <View style={styles.pictureInfo}>
        <View style={styles.pictureComments}>
          <Pressable onPress={() => navigation.navigate("Comments")}>
            <MaterialCommunityIcons
              name="message-reply"
              size={24}
              color="#FF6C00"
              style={{ marginRight: 6 }}
            />
          </Pressable>

          <Text style={styles.pictureStatistics}>{comments}</Text>
        </View>
        <View style={styles.pictureLikes}>
          <AntDesign
            name="like2"
            size={24}
            color="#FF6C00"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.pictureStatistics}>{likes}</Text>
        </View>

        <View style={styles.pictureLocation}>
          <AntDesign
            name="enviromento"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Text style={[styles.pictureStatistics, styles.underline]}>
              {location}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
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
  },
  pictureStatistics: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  pictureLikes: { flexDirection: "row", alignItems: "center" },
  pictureLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
