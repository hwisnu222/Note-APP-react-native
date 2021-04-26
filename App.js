import { StatusBar } from "expo-status-bar";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

import Home from "./src/screens/Home";
import Info from "./src/screens/Info";
import Lock from "./src/screens/Lock";
import ConfirmLock from "./src/screens/ConfirmLock";
import Auth from "./src/screens/Auth";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: "#FCFBF9" },
        }}
      >
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Lock" component={Lock} />
        <Stack.Screen name="Confirm" component={ConfirmLock} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
