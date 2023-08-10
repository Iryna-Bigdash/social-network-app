import React, { useState } from "react";

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
  const [photoURI, setPhotoURI] = useState(null);

  const navigation = useNavigation();

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
            </View>
            <Text style={styles.operationPhotoText}>Завантажте фото</Text>

            <TextInput
              placeholder="Назва..."
              style={styles.inputName}
            ></TextInput>
            <View style={styles.inputPlaceWrap}>
              <TextInput
                placeholder="Місцевість..."
                style={styles.inputPlace}
              />

              <AntDesign
                name="enviromento"
                size={24}
                color="#BDBDBD"
                style={styles.inputPlaceIco}
              />
            </View>

            <Pressable style={styles.postButton}>
              <Text style={styles.postButtonText}>Опубліковати</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Pressable style={styles.postButtonTrash}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

export default CreatePostsScreen;

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
    color: "#BDBDBD",
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
    color: "#BDBDBD",
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
