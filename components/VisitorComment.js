import { Text, View, Image, StyleSheet } from "react-native";

const VisitorComment = ({ ico, text, time }) => {
  return (
    <View style={styles.visitCommentWrap}>
      <View style={styles.icoWrap}>
        <Image source={ico} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default VisitorComment;

const styles = StyleSheet.create({
  visitCommentWrap: {
    flexDirection: "row",
    marginBottom: 24,
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
  },
  icoWrap: {
    marginRight: 16,
    borderRadius: 14,
    overflow: "hidden",
    width: 28,
    height: 28,
  },

  textBlock: {
    padding: 16,
    backgroundColor: "rgba(0 0 0 / 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
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
    textAlign: "right",
  },
});
