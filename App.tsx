import React, { useEffect } from "react";
import { extendTheme, NativeBaseProvider } from "native-base";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import axios from "axios";
import Routes from "./src/Routes";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
import fonts from "./src/utils/allFontsGlyps";
import fontCon from "./src/utils/fontConfigNative";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
axios.defaults.withCredentials = true;
export default function App() {
  // let [fontsLoaded] = useFonts(fonts);
  let [fontsLoaded] = useFonts({
    p6: require("./src/assets/fonts/p6.ttf"),
  });
  const theme = extendTheme({
    fontConfig: { p6: { 400: { normal: "p6" } } },
  });

  async function openDatabase() {
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./src/assets/db/quran.db")).uri,
      FileSystem.documentDirectory + "SQLite/quran.db"
    );
    return SQLite.openDatabase("quran.db");
  }
  // const theme = extendTheme({
  //   fontConfig: fontCon,
  // });
  openDatabase();
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
}
