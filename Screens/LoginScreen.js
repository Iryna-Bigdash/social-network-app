import React, { useState, useEffect } from "react";

import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Text,
  ImageBackground,
  View,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";

import { auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";
import { loginDB } from "../redux/services/userService";

import { useNavigation } from "@react-navigation/native";

import PhotoBG from "../assets/images/bgrPhoto.png";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [focusEmailInput, setFocusEmailInput] = useState(false);
  const [focusPasswordInput, setFocusPasswordInput] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    setIsFormValid(email !== "" && password !== "");
  }, [email, password]);

  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
    console.log("hidePassword", hidePassword);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
        setEmail("");
        setPassword("");
      }
    });
  }, []);

  const handleSignIn = async () => {
    if (isFormValid) {
      setEmail(email);
      setPassword(password);

      try {
        await loginDB(email, password);

        navigation.navigate("Home");
      } catch (error) {
        console.log("No user in db");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={PhotoBG}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <ScrollView contentContainerStyle={styles.authAreaBlock}>
              <Text style={styles.title}>Увійти</Text>

              <View style={styles.inputWrap}>
                <TextInput
                  style={
                    focusEmailInput
                      ? [styles.input, styles.focusedInput]
                      : styles.input
                  }
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text.trim());
                    console.log("Email:", text);
                  }}
                  onFocus={() => setFocusEmailInput(true)}
                  onBlur={() => setFocusEmailInput(false)}
                />
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={
                    focusPasswordInput
                      ? [styles.input, styles.focusedInput]
                      : styles.input
                  }
                  placeholder="Пароль"
                  name="password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    console.log("Password:", text);
                  }}
                  onFocus={() => setFocusPasswordInput(true)}
                  onBlur={() => setFocusPasswordInput(false)}
                  secureTextEntry={hidePassword}
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

              <Pressable
                style={styles.button}
                onPress={handleSignIn}
                disabled={!isFormValid}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </Pressable>

              <Pressable
                style={styles.linkTextWrap}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.linkText}>
                  Немає акаунту?&nbsp;
                  <Text style={styles.underline}>Зареєструватися</Text>
                </Text>
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
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  authAreaBlock: {
    paddingTop: 32,
    height: 489,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontFamily: "r-medium",
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
  underline: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
