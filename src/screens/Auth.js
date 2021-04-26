import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text } from "react-native";

export default function Auth({ navigation }) {
  const getLock = async () => {
    try {
      const value = await AsyncStorage.getItem("lock");
      const valueBolean = JSON.parse(value);

      console.log(valueBolean);

      if (valueBolean) {
        // change icon
        return true;
      } else {
        return false;
      }
    } catch (e) {
      alert("yahh, tidak bisa mendapatkan data");
    }
  };

  const checkLock = async () => {
    const isLock = await getLock();
    console.log(isLock);

    if (isLock) {
      navigation.navigate("Lock");
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    checkLock();
  }, []);

  return (
    <View>
      <Text>Note</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
