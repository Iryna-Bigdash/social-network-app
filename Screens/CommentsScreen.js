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

import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/slices/commentSlice";

// import VisitorComment from "../components/VisitorComment";
// import AuthorComment from "../components/AuthorComment";
import CustomHeader from "../components/CustomHeader";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// import Sunset from "../assets/images/sunset.jpg";
// import AuthorAva from "../assets/images/AuthorAva.jpg";
import VisitorAva from "../assets/images/VisitorAva.jpg";

const CommentsScreen = () => {
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);
  const [comment, setComment] = useState("");
  const [postItem, setPostItem] = useState(null);
  const [isCommentEntered, setIsCommentEntered] = useState(false);

  const route = useRoute();
  const { postId } = route.params;

  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const post = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
        .filter((docData) => docData.id === postId);

      setPostItem(post[0]);
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })} | ${currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const hanlePostComment = () => {
    const trimmedComment = comment.trim();

    if (isCommentEntered && trimmedComment !== "") {
      setComment(trimmedComment);

      dispatch(addComment({ postId, comment: trimmedComment, formattedDate }));

      setComment("");
      setTimeout(() => {
        getDataFromFirestore();
      }, 1000);
    }
  };

  const navigation = useNavigation();
  // console.log(navigation.getState());

  return (
    <View style={styles.container}>
      <CustomHeader title="Коментарі" />

      <ScrollView style={styles.screenMainContent}>
        <View style={styles.imageWrap}>
          {postItem && (
            <Image
              source={{ uri: postItem.data.previewImage }}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.mainContent}>
          <View style={styles.publicationContainer}>
            <View style={styles.commentsContainer}>
              {postItem &&
                postItem.data.comments.map((comment, index) => (
                  <View
                    style={[
                      styles.commentItem,
                      index % 2 === 0 ? styles.commentItemReverse : null,
                    ]}
                    key={index}
                  >
                    <Image
                      style={styles.commentAvatar}
                      source={VisitorAva}
                      ico={VisitorAva}
                      // source={require("../images/avatar-blank.jpg")}
                    />
                    <View
                      style={[
                        styles.comment,
                        index % 2 === 0 ? styles.commentReverse : null,
                      ]}
                    >
                      <Text style={styles.commentText}>{comment.comment}</Text>
                      <Text style={styles.commentDate}>{comment.date}</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>

        {/* <VisitorComment
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
        /> */}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputCommentWrap}>
          <TextInput
            style={[
              [styles.input],
              focusedInput === "comment" && [styles.inputFocused],
            ]}
            placeholderTextColor={"#BDBDBD"}
            placeholder="Коментувати..."
            name="comment"
            // style={styles.inputComment}
            value={comment}
            onChangeText={(text) => {
              setComment(text);
              setIsCommentEntered(text.trim() !== "");
            }}
            onFocus={() => setFocusedInput("comment")}
            onBlur={() => setFocusedInput(null)}
          />
          <Pressable 
          style={styles.buttonPost}
          onPress={hanlePostComment}
          disabled={!isCommentEntered || comment.trim() === ""}
          // style={styles.commentButton}
          >
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
  publicationContainer: {
    marginBottom: 82,
  },
  commentsContainer: {
    gap: 24,
  },
  commentItem: {
    gap: 16,
    flexDirection: "row",
    width: "100%",
  },
  commentItemReverse: {
    flexDirection: "row-reverse",
  },
  commentAvatar: {
    borderRadius: 28,
    width: 28,
    height: 28,
  },
  comment: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 16,
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  commentReverse: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
    marginTop: 8,
  },
  commentDateReverse: {
    textAlign: "left",
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 16,
    backgroundColor: "#fff",
    right: 0,
  },
  input: {
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    padding: 16,
    height: 50,
    borderRadius: 25,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#000",
  },
  buttonPost: {
    position: "absolute",
    right: 24,
    top: 24,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 34,
    justifyContent: "center",
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
