import { Text, View, Image, StyleSheet } from "react-native";

const AuthorComment = ({ ico, text, time }) => {
  return (
    <View style={styles.authCommentWrap}>
      <View style={styles.textBlock}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.icoWrap}>
        <Image source={ico} />
      </View>
    </View>
  );
};

export default AuthorComment;

const styles = StyleSheet.create({
  authCommentWrap: {
    flexDirection: "row",
    marginBottom: 24,
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textBlock: {
    padding: 16,
    backgroundColor: "rgba(0 0 0 / 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    width: 299,
  },
  text: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",

    marginBottom: 8,
  },
  time: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "left",
  },
  icoWrap: {
    marginLeft: 16,
    borderRadius: 14,
    overflow: "hidden",
    width: 28,
    height: 28,
  },
});
