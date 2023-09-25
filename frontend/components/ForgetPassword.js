import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const handleSubmit = async () => {
    if (email === "") {
      setmessage("Enter email");
      return;
    }
    // setmessage("");
    try {
      let uri = `https://react-native-authentication-8j2o.vercel.app/forget_password`;
      let data = { email: email };
      let res = await axios.post(uri, data);
      if (res.data) {
        setmessage("OTP has send to your email")
        navigation.navigate("ResetPassword", { email: email });
      }
      setmessage("Email not found")
    } catch (error) {
      setmessage("Email not found");
    }
  };
  return (
    <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <Text style={styles.enterEmailText}>Enter Your Email</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
          <TextInput
            style={styles.emailInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        <Text style={{ fontSize: 15, textAlign: "center", marginBottom:13}}>
          {message}
        </Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Send OTP</Text>
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
  enterEmailText: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  emailInput: {
    borderBottomWidth: 0.5,
    height: 48,
    backgroundColor: "white",
    borderBottomColor: "#8e93a1",
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
export default ForgetPassword;
