import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text,TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setloginMessage] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "937007919304-7aj3li8q2a0csjgb3ud5gv7mc89mk8tf.apps.googleusercontent.com",
    webClientId:
      "937007919304-p5j2l4arud42ihg1umg1jmbsfm2d7n9j.apps.googleusercontent.com",
  });
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);
  async function handleSignInWithGoogle() {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      // setUserInfo(user);
      if (user) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("catch the error");
    }
  };
  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setloginMessage("All fields are required");
      return;
    }
    try {  
      let uri = `https://react-native-authentication-8j2o.vercel.app/signin`;
      let data = {
        email: email,
        password: password,
      };
      let res = await axios.post(uri, data);
      if (res.data) setloginMessage("SignIn successfully");
      navigation.navigate("Home", { token: res.data });
    } catch (error) {
      setloginMessage("Username or Password is incorrect");
    }
  };
  return (
    <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <Text style={styles.signupText}>SIGN IN</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>PASSWORD</Text>
          <TextInput
            style={styles.signupInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoComplteType="password"
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", marginBottom: 10, color:"red" }}>
          {loginMessage}
        </Text>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          Not yet registered?{" "}
          <Text
            style={{ color: "red", fontWeight: "bold" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}>
          Forgot Password?{" "}
          <Text
            style={{ color: "red", fontWeight: "bold" }}
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            Reset
          </Text>
        </Text>
        <TouchableOpacity
        onPress={() => promptAsync()}
        style={styles.button2Style}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 30,
    textAlign: "center",
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    backgroundColor: "white",
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
  button2Style: {
    backgroundColor: "blue",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default SignIn;
