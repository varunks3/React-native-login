import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'


WebBrowser.maybeCompleteAuthSession();
const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneMessage, setphoneMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [passwordMessage, setpasswordMessage] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"937007919304-7aj3li8q2a0csjgb3ud5gv7mc89mk8tf.apps.googleusercontent.com",
    webClientId:"937007919304-p5j2l4arud42ihg1umg1jmbsfm2d7n9j.apps.googleusercontent.com"
  })
  useEffect(() => {
  handleSignInWithGoogle();
  }, [response])
  async function handleSignInWithGoogle(){
     if(response?.type === "success"){
      console.log(response)
      await getUserInfo(response.authentication.accessToken)
     }
  }
// ya29.a0AfB_byCxW7FNCJQTNT8QmbyHbOjeQDaYRoUlSa3-pDkyCqtgQR6vk4oDPgzW5BS6D7oAq5l2t6U8xGxLCLK1Eh0Adj4zsL_x18fw32RzB1tdNVfWBlosp1ZZzmkS3XrFrsvKUXWWb3aT5bnCBm6HMD2w1MGOx2k8_Gi45waCgYKATISARESFQHsvYls89YeliAyFjSVJoj0Z9gHlg0173
// ya29.a0AfB_byC4HdISkCtwkEsAIcXmGL7UmE5r15lqSU3G0VFnpyl0jMZhdLBdanWYWvdGViMnBnLbCIJeb98tHRsXtuaHiSOMHFJR7gP2l3USJytHWnuEoHIBeSjkX_vdwCzJtxwK2hAisJAwDCqYq53oMzEpsn7F3H-cQoEg_gaCgYKAfYSARESFQHsvYlsq4_HI3p1snFDgUJ0NAbaMg0173
// ya29.a0AfB_byBcTEUZTpBCT90Ja5vw__Z70VEfMRNbxTG-vr8RIyEgOrl0sQ733haHD2-TAzZZTKWZ6-3YmB5dTkvTIP2x6bCBNZUksJeD6z-70thZX6o-nmiN97eB5FJo3TyOhjuspv7g_Uvu-cBFLgUNTg-RISA_Rd-TY_EeYgaCgYKAQ8SARESFQHsvYls0FOXi_PEzq3hoF_KmGdI7A0173

  const getUserInfo = async (token) => {
    if(!token) return;
    try{
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers:{Authorization: `Bearer ${token}`},
        }
      );
      const user = await response.json();
      console.log(user)
      if(user){
        navigation.navigate("Home")
      }
    }catch(error){
      console.log("catch the error")
    }
  }
  const handleSubmit = async () => {
    if (name === "" || number === "" || email === "" || password === "") {
      alert("All fields are required");
      return;
    }
    if (number.length < 10) {
      setphoneMessage("Number must be minimum of 10 digit");
      return;
    }
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(number)) {
      setphoneMessage("Invalid phone number");
      return;
    }
    setphoneMessage("");
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmailMessage("Invalid email address");
      return;
    }
    setEmailMessage("");
    let preg = /^[a-zA-Z0-9!@#$%^&*]{7,16}$/
    if (preg.test(password) === false) {
      setpasswordMessage("password did not match the criteria");
      return;
    }
    setpasswordMessage("");

    try {
      let data = {
        name: name,
        phone: number,
        email: email,
        password: password,
      };
      let res = await axios.post("https://react-native-authentication-8j2o.vercel.app/signup", data);
      if (res.data) alert("Sign Up Successful");
    } catch (error) {
      alert("Failed to Signup")
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.signupText}>SIGN UP</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>NAME</Text>
          <TextInput
            style={styles.signupInput}
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>Phone No</Text>
          <TextInput
            style={styles.signupInput}
            value={number}
            onChangeText={(text) => setNumber(text)}
            autoCorrect={false}
            keyboardType="numeric"
          />
          <Text style={{ color: "red" }}>{phoneMessage}</Text>
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Text style={{ color: "red" }}>{emailMessage}</Text>
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
          <Text style={{ color: "red" }}>{passwordMessage}</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => promptAsync()} style={styles.button2Style}>
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          Already Joined?{" "}
          <Text
            style={{ color: "red", fontWeight: "bold" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            {" "}
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 0,
    flex: 1,
    // justifyContent: "center",
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
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  button2Style: {
    backgroundColor: "blue",
    height: 50,
    marginBottom: 10,
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
export default SignUp;
