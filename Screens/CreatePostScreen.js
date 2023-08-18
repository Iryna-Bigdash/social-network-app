import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {


  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [photoURI, setPhotoURI] = useState(null);

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const makePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });

      setPhotoURI(uri);
    }
  };

  const handleSubmit = async () => {
    console.log("Post created");

    if (location) {
      try {
        const address = await Location.reverseGeocodeAsync(location);
        console.log("Location:", location);
        console.log("Address:", address);
      } catch (error) {
        console.error("Error while reverse geocoding:", error);
      }
    } else {
      console.warn("Location is not available");
    }

    navigation.navigate("PostsScreen");
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleDeletePhoto = () => {
    setPhotoURI(null);
    setTitle("");
    setPlace("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView style={styles.mainContent}>
            <View style={styles.photoWrap}>
              {photoURI && (
                <ImageBackground
                  source={{ uri: photoURI }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Pressable style={styles.buttonLoadPhoto}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </Pressable>
                </ImageBackground>
              )}
              {!photoURI && (
                <Camera
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                  type={type}
                  ref={setCameraRef}
                  ratio="1:1"
                >
                  <Pressable style={styles.buttonLoadPhoto} onPress={makePhoto}>
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </Pressable>
                </Camera>
              )}
            </View>
            <Text style={styles.operationPhotoText}>Завантажте фото</Text>
            <TextInput
              placeholder="Назва..."
              style={[
                styles.inputName,
              ]}
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.inputPlaceWrap}>
              <TextInput
                placeholder="Місцевість..."
                style={[
                  styles.inputPlace,
                ]}
                value={place}
                onChangeText={setPlace}
              />
              <AntDesign
                name="enviromento"
                size={24}
                color="#BDBDBD"
                style={styles.inputPlaceIco}
              />
            </View>
            <Pressable
              style={[
                styles.postButton,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.postButtonText}>Опубліковати</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Pressable style={styles.postButtonTrash} onPress={handleDeletePhoto}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    height: "auto",
    height: "100%",
  },
  photoWrap: {
    width: "100%",
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonLoadPhoto: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -30 }, { translateX: -30 }],
    alignItems: "center",
    justifyContent: "center",
  },

  operationPhotoText: {
    marginTop: 8,
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    color: "#BDBDBD",
  },

  inputName: {
    marginTop: 32,
    paddingVertical: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputPlaceWrap: {
    marginTop: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  inputPlace: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 28,
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    // color: "#BDBDBD",
  },
  inputPlaceIco: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -14 }],
  },
  postButton: {
    marginTop: 32,
    maxWidth: 343,
    width: "100%",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  postButtonText: {
    textAlign: "center",
    fontFamily: "r-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    // color: "#BDBDBD",
  },
  postButtonTrash: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 34,
    marginTop: "auto",
  },
});

export default CreatePostsScreen;
