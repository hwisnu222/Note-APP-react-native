import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Text } from "react-native-elements";

export default function Info({ navigation }) {
  const goBack = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menu}>
          <Icon
            name="chevron-left"
            color="#535353"
            size={24}
            onPress={goBack}
          />
          <Text h3 style={styles.title} onPress={goBack}>
            About
          </Text>
        </View>
      </View>

      <View>
        <Text>
          Thank you, sudah memakai aplikasi kami, kami berupaya untuk
          mengembangakan app dengan semaksimal mungkin. agar kedepan appp ini
          dapat memberikan manfaat buat kita ya. Dan kami harap kalian suka
          dengan app ini. satu lagi, kalau kamu ingin berkontribusi kalian bisa
          contact kami
        </Text>
        <View style={styles.about}>
          <Text>Name : Note</Text>
          <Text>Version : 1</Text>
          <Text>Developer: Wisnu Harjanta</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 16, paddingHorizontal: 20 },
  button: {
    backgroundColor: "#d2d2d2",
    marginTop: 36,
  },
  title: {
    color: "#535353",
  },
  header: {
    paddingTop: 28,
    marginBottom: 24,
  },
  menu: { flexDirection: "row", alignItems: "center" },
  about: {
    marginTop: 24,
  },
});
