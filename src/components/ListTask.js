import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export default function ListTask(props) {
  return (
    <View>
      <CheckBox
        title={props.title}
        textStyle={styles.checkboxText}
        checked={props.check}
        checkedColor="#d2d2d2"
        checkedIcon={<Icon name="check-circle" color="#4C5B60" size={20} />}
        uncheckedIcon={<Icon name="circle" color="#c4c4c4" size={20} />}
        containerStyle={styles.listView}
        onLongPress={() => {
          props.remove(props.id);
        }}
        onPress={() => {
          props.change(props.id);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkboxText: {
    color: "#535353",
  },
});
