// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import React, { useState, useEffect } from "react";

// WebBrowser.maybeCompleteAuthSession();

// const SignInWithGoogle = ({ navigation }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId:
//       "937007919304-0et8o21ieonhrnv144hb81ted3in3fua.apps.googleusercontent.com",
//     webClientId:
//       "937007919304-p5j2l4arud42ihg1umg1jmbsfm2d7n9j.apps.googleusercontent.com",
//   });
//   useEffect(() => {
//     handleSignInWithGoogle();
//   }, [response]);
//   async function handleSignInWithGoogle() {
//     if (response?.type === "success") {
//       await getUserInfo(response.authentication.accessToken);
//     }
//   }
//   const getUserInfo = async (token) => {
//     if (!token) return;
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const user = await response.json();
//       setUserInfo(user);
//       if (user) {
//         navigation.navigate("Home");
//       }
//     } catch (error) {
//       console.log("catch the error");
//     }
//   };
//   return (
//     <View>
//       {/* <Text>{JSON.stringify(userInfo)}</Text> */}

//       <TouchableOpacity
//         onPress={() => promptAsync()}
//         style={styles.buttonStyle}
//       >
//         <Text style={styles.buttonText}>Sign in with Google</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   buttonStyle: {
//     backgroundColor: "blue",
//     height: 50,
//     marginBottom: 20,
//     justifyContent: "center",
//     marginHorizontal: 15,
//     borderRadius: 15,
//   },
//   buttonText: {
//     fontSize: 20,
//     textAlign: "center",
//     color: "#fff",
//     textTransform: "uppercase",
//     fontWeight: "bold",
//   },
// });
// export default SignInWithGoogle;
