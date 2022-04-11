import { Box, FlatList, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

const Home: React.FC = () => {
  // const [data, setData] = useState<Surah | null>(null);
  const navigation = useNavigation();
  const db = SQLite.openDatabase("quran.db");
  const [lines, setLines] = useState([]);
  const [pageNumber, setPageNumber] = useState(5);
  useEffect(() => {
    // surahs ? setData(surahs) : null;
    db.transaction((tx) => {
      tx.executeSql(
        `select * from page where pageNumber = ${pageNumber}`,
        [],
        (_, r) => {
          // console.log(s);
          const rows = r.rows._array;
        }
      );
      tx.executeSql(
        `select * from line where pageID = ${pageNumber}`,
        [],
        (_, r) => {
          const rows = r.rows._array;
          let ids = [];
          for (let i = 0; i < rows.length; i++) {
            let curLine = rows[i];
            ids.push(curLine.id);
          }
          for (let i = 0; i < ids.length; i++) {
            tx.executeSql(
              `select * from word where lineID = ${ids[i]}`,
              [],
              (_, r) => {
                const rows = r.rows._array;
                setLines((prev) => [...prev, rows]);
                // console.log("wasd", r);
                // setLines(r);
              }
            );
          }
        }
      );
    });
  }, []);

  return (
    <Box
      mt="8"
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
      flex="1"
    >
      <Box>
        {lines?.map((line) => {
          return (
            <Box flexDirection={"row"}>
              {line?.map((word) => {
                return (
                  <Text
                    fontFamily={"p6"}
                    color="white"
                    fontSize={"25.5px"}
                    lineHeight={47}
                  >
                    {word.text}
                  </Text>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;

// const searchSurah = (text) => {
//   console.log(text);
//   let query = data.filter((item) => {
//     return item.name === "سُورَةُ ٱلْفَاتِحَةِ";
//   });
//   setData(query);
//   // setData(query);
// };
