import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Input, Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

// component
import ListTask from "../components/ListTask";

export default function Home({ navigation }) {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [lock, setLock] = useState(false);

  const saveTask = () => {
    if (text) {
      const newTask = { name: text, doing: false };

      setTask([newTask, ...task]);

      // store data to asyncstorage
      storeData([newTask, ...task]);

      setText("");
    }
  };

  const removeTask = (index) => {
    task.splice(index, 1);
    setTask([...task]);

    // store data to asyncstorage
    storeData(task);
  };

  const success = (idIndex) => {
    // spread array
    const taskAll = [...task];

    // change value object using map function
    taskAll.map((item, index) => {
      if (index == idIndex) {
        item.doing = !item.doing;
      }
    });

    setTask(taskAll);

    // store data to asyncstorage
    storeData(task);
  };

  const lockApp = () => {
    storeLock();
  };

  const storeData = async (tasklist) => {
    const valueString = JSON.stringify(tasklist);
    console.log(valueString);

    try {
      await AsyncStorage.setItem("task", valueString);
    } catch (e) {
      alert("yahh, belum bisa mencatat task");
    }
  };

  const storeLock = async () => {
    const isLock = await getLock();

    if (!isLock) {
      navigation.navigate("Confirm");
      setLock(true);
    } else {
      await AsyncStorage.removeItem("lock");
      alert("unlock");
      setLock(false);
    }
  };

  const getStore = async () => {
    try {
      const value = await AsyncStorage.getItem("task");

      const valueStore = JSON.parse(value);
      setTask([...valueStore]);
    } catch (e) {
      alert("yahh, tidak bisa mendapatkan data");
    }
  };

  const getLock = async () => {
    try {
      const value = await AsyncStorage.getItem("lock");

      if (value) {
        // change icon
        setLock(true);
        return true;
      } else {
        setLock(false);
        return false;
      }
    } catch (e) {
      alert("yahh, tidak bisa mendapatkan data");
    }
  };

  useEffect(() => {
    // update view
    setTask(task);
  }, [task]);

  useEffect(() => {
    getStore();
    getLock();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3 style={styles.title}>
          Note
        </Text>
        <View style={styles.iconHeader}>
          {lock ? (
            <Icon
              name="lock"
              size={24}
              color="black"
              style={styles.iconItem}
              onPress={lockApp}
            />
          ) : (
            <Icon
              name="unlock"
              size={24}
              color="black"
              style={styles.iconItem}
              onPress={lockApp}
            />
          )}

          <Icon
            name="info"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Info")}
          />
        </View>
      </View>

      <ScrollView style={styles.task}>
        {task.map((list, index) => (
          <ListTask
            id={index}
            key={index}
            title={list.name}
            check={list.doing}
            remove={removeTask}
            change={success}
          />
        ))}
      </ScrollView>

      <View style={styles.inputTask}>
        <Input
          placeholder="Create note"
          value={text}
          onChangeText={(value) => {
            setText(value);
          }}
          inputContainerStyle={styles.input}
          rightIcon={
            <Icon
              name="edit"
              size={24}
              color="#535353"
              onPress={() => {
                saveTask();
              }}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  iconHeader: {
    flexDirection: "row",
  },
  iconItem: {
    marginRight: 20,
  },
  title: {
    color: "#535353",
  },
  header: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  task: {
    flex: 2,
  },
  inputTask: {
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: "#E3E1E1",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
});
