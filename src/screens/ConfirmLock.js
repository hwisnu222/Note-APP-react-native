import React from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import CodeInput from "react-native-confirmation-code-input";

export default function ConfirmLock({ navigation }) {
  const fullFill = async (code) => {
    const codeString = JSON.stringify(code);

    try {
      await AsyncStorage.setItem("lock", codeString);
      navigation.navigate("Home");
    } catch (e) {
      alert("yahh, belum bisa lock app");
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="lock" color="#d2d2d2" size={50} />
      <Text style={styles.title}>Set Password</Text>
      <View style={styles.containerInputCode}>
        <CodeInput
          // ref="codeInputRef1"
          codeInputStyle={styles.code}
          codeLength={4}
          keyboardType="numeric"
          space={5}
          size={40}
          inputPosition="center"
          onFulfill={(code) => fullFill(code)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "30%",
    alignItems: "center",
    height: "100%",
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    marginBottom: 24,
    color: "#535353",
  },
  containerInputCode: {
    height: "20%",
  },
  code: {
    fontSize: 40,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#d2d2d2",
    color: "#d2d2d2",
  },
});
