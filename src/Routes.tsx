import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Surah from "./screens/Surah";
import { RootStackParamList } from "./assets/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Surah" component={Surah} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer theme={{ colors: { background: "#18181b" } }}>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Routes;
