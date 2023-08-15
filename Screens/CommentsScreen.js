import {
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

import VisitorComment from "../components/VisitorComment";
import AuthorComment from "../components/AuthorComment";
import CustomHeader from "../components/CustomHeader";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Sunset from "../assets/images/sunset.jpg";
import AuthorAva from "../assets/images/AuthorAva.jpg";
import VisitorAva from "../assets/images/VisitorAva.jpg";

const CommentsScreen = () => {
  const navigation = useNavigation();
  console.log(navigation.getState());

  return (
    <View style={styles.container}>
      <CustomHeader title="Коментарі" />

      <ScrollView style={styles.screenMainContent}>
        <View style={styles.imageWrap}>
          <Image source={Sunset} />
        </View>

        <VisitorComment
          ico={VisitorAva}
          text="Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!"
          time="09 червня, 2020 | 08:40"
        />
        <AuthorComment
          ico={AuthorAva}
          text="A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images."
          time="09 червня, 2020 | 09:14"
        />

        <VisitorComment
          ico={VisitorAva}
          text="Thank you! That was very helpful!"
          time="09 червня, 2020 | 09:20"
        />

      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputCommentWrap}>
          <TextInput
            placeholder="Коментувати..."
            name="comment"
            style={styles.inputComment}
          />
          <Pressable style={styles.commentButton}>
            <AntDesign name="arrowup" size={24} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrap: {
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
    marginTop: 32,
  },
  inputCommentWrap: {
    width: 343,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    marginTop: 5,
  },
  inputComment: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
    borderColor: "#BDBDBD",
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 50,
    borderWidth: 1,
  },
  commentButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
