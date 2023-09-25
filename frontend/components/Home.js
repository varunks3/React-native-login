import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ route }) => {
  const [state, setstate] = useState("");
  useEffect(() => {
    async function fetch() {
      try {
        let url = "https://react-native-authentication-8j2o.vercel.app/protected";
        const config = {
          headers: {
            Authorization: route.params.token.token,
          },
        };
        let res = await axios.get(url, config);
        setstate(res.data);
      } catch (error) {
        // alert("Cannot access this data");
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Text>Hello</Text>
      <Text>World</Text>
    </>
  );
};

export default Home;
