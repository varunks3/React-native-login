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
  
  const ResetPassword = ({navigation, route}) => {
    const [otp, setOTP] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async () => {
      if (otp === ""|| newPassword === "" || confirmPassword == "") {
        alert("Enter all the field");
        return;
      }
     
      try {
        let uri = `https://react-native-authentication-8j2o.vercel.app/reset_password`;
        let data = { email:route.params.email, otp: otp, newPassword:newPassword };
        let res = await axios.post(uri, data);
        if (res.data) alert("Password reset successfully");
        navigation.navigate("SignIn");
      } catch (error) {
        alert("Password reset faild");
      }
    };
    return (
      <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
        <View style={{ marginVertical: 50 }}>
          <Text style={styles.resetText}>Reset Password</Text>
          <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: "#8e93a1" }}>OTP</Text>
            <TextInput
              style={styles.resetInput}
              value={otp}
              onChangeText={(text) => setOTP(text)}
              autoCorrect={false}
            />
          </View>
          <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>NEW PASSWORD</Text>
          <TextInput
            style={styles.resetInput}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
            autoComplteType="password"
          />
        </View>       
         <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.resetInput}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            autoComplteType="password"
          />
        </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
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
    resetText: {
      fontSize: 30,
      textAlign: "center",
      marginBottom:30,
    },
    resetInput: {
      borderBottomWidth: 0.5,
      height: 48,
      backgroundColor: "white",
      borderBottomColor: "#8e93a1",
      marginBottom: 30,
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
  export default ResetPassword;
  