import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import CodeInput from "react-native-confirmation-code-input";

export default function Lock({ navigation }) {
  const [codeLock, setCodeLock] = useState("");

  const getCodeLock = async () => {
    try {
      const codeLock = await AsyncStorage.getItem("lock");

      setCodeLock(JSON.parse(codeLock));
    } catch (e) {}
  };

  const fullFill = (isValid) => {
    console.log(isValid);
    if (isValid) {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    getCodeLock();
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="lock" color="#d2d2d2" size={50} />
      <Text style={styles.title}>Password</Text>
      <View style={styles.containerInputCode}>
        <CodeInput
          // ref="codeInputRef1"
          codeInputStyle={styles.code}
          codeLength={4}
          keyboardType="numeric"
          compareWithCode={codeLock}
          space={5}
          size={40}
          inputPosition="center"
          onFulfill={(isValid) => fullFill(isValid)}
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
