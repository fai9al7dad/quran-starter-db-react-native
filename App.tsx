import React from "react";
import { extendTheme, NativeBaseProvider } from "native-base";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import axios from "axios";
import Routes from "./src/Routes";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
import fonts from "./src/utils/allFontsGlyps";
import fontCon from "./src/utils/fontConfigNative";

axios.defaults.withCredentials = true;
export default function App() {
  let [fontsLoaded] = useFonts(fonts);

  const theme = extendTheme({
    fontConfig: fontCon,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
}
