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

  useFocusEffect(
    React.useCallback(() => {
      const getDataFromFirestore = async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));
          const postsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setPosts(postsList);
          return postsList;
        } catch (error) {
          throw error;
        }
      };

      getDataFromFirestore();
    }, [])
  );

  const handleLogout = async () => {
    await signOut(auth);
    setUserData([]);
    navigation.navigate("Login");
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenMainContent}>
        <View style={styles.userBlock}>
          <View style={styles.userBlockPhotoWrap}>
            <Image source={RomanovaImg} />
          </View>
          <View style={styles.userBlockInfo}>
            <Text style={styles.userBlockName}>
            {userData.displayName && userData.displayName}
            </Text>
            <Text style={styles.userBlockEmail}>
            {userData.email}
            </Text>
          </View>
        </View>
        <View>
        {posts && (
          <View>
{posts.map((postItem) => (
 <View key={postItem.id}>
<PostCard
          pictureSource={{ uri: postItem.data.previewImage }}
          title="Ліс"
          comments="0"
          likes="0"
          location="Ivano-Frankivs'k Region, Ukraine"
          hideLikes
        />
        </View>
)
)
}
</View>
        )}
        </View>

        
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
