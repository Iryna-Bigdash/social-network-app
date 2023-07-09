import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Pressable,
} from "react-native";

import bgrPhoto from "../assets/images/bgrPhoto.png";

import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = () => {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
    // console.log("hidePassword", hidePassword);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgrPhoto}
        resizeMode="cover"
        style={styles.bgrPhoto}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <ScrollView contentContainerStyle={styles.formAreaBlock}>
              <View>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarPhotoWrap}></View>
                  <AntDesign
                    name="pluscircleo"
                    size={25}
                    color="#FF6C00"
                    style={styles.addIcon}
                  />
                </View>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.input, isLoginFocused && styles.focusedInput]}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsLoginFocused(true)}
                  onBlur={() => setIsLoginFocused(false)}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.input, isEmailFocused && styles.focusedInput]}
                  placeholder="Адреса електронної пошти"
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  style={[styles.input, isPasswordFocused && styles.focusedInput]}
                  placeholder="Пароль"
                  name="password"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <Pressable
                  style={styles.pressableShowPassword}
                  onPress={togglePassword}
                >
                  <Text style={styles.showPassword}>
                    {hidePassword ? "Показати" : "Сховати"}
                  </Text>
                </Pressable>
              </View>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Зареєcтруватися</Text>
              </Pressable>
              <Pressable
                style={styles.linkTextWrap}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgrPhoto: {
    flex: 1,
    justifyContent: "center",
  },
  formAreaBlock: {
    height: 549,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "relative",
    top: -60,
    marginBottom: -28,
  },
  avatarPhotoWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  addIcon: {
    zIndex: 100,
    position: "absolute",
    right: -12.5,
    bottom: 14,
    backgroundColor: "white",
    borderRadius: 12.5,
    overflow: "hidden",
  },
  title: {
    fontFamily: "r-medium'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  inputWrap: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    width: 345,
    padding: 16,
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
  pressableShowPassword: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
  showPassword: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  button: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 51,
    width: 345,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  buttonText: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  linkTextWrap: {
    marginTop: 16,
  },
  linkText: {
    fontFamily: "r-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
