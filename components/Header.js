import { Text, View, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.screenHeader}>
      <View style={styles.screenHeaderLeft}>
        {(title === "Створити публікацію" || title === "Коментарі") && (
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
          </Pressable>
        )}
      </View>
      <View style={styles.screenHeaderCenter}>
        <Text style={styles.screenHeaderText}>{title}</Text>
      </View>
      <View style={styles.screenHeaderRight}>
        {title === "Пубілкації" && (
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  screenHeader: {
    marginTop: 44,
    height: 44,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
  },
  screenHeaderLeft: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },
  screenHeaderCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  screenHeaderRight: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
  },

  screenHeaderText: {
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
});
