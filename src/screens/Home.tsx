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
  const [prevPage, setPrevPage] = useState([]);
  const [nextPage, setNextPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(293);
  // data array
  // include 3 pages
  // focus on one page
  // if go to right
  // increase page number
  // if go to left
  // increase page number
  const fillIDs = (rows: any) => {
    let ids = [];
    for (let i = 0; i < rows.length; i++) {
      let curLine = rows[i];
      ids.push(curLine.id);
    }
    return ids;
  };
  const errorCB = (t: any, e: any) => {
    console.log("error", e);
  };
  useEffect(() => {
    db.transaction((tx) => {
      let query = `
          select json_group_array(
            json_object('id',id,'pageID',pageID,'words',
            (select json_group_array(
              json_object(
              'text',text,'chapterCode',chapterCode,'isNewChapter',isNewChapter
              )
            )
            from word where word.lineID = line.id)
            )) from line where pageID = ${pageNumber}`;
      let prevquery = `
      select json_group_array(
        json_object('id',id,'pageID',pageID,'words',
        (select json_group_array(
          json_object(
          'text',text,'chapterCode',chapterCode,'isNewChapter',isNewChapter
          )
        )
        from word where word.lineID = line.id)
        )) from line where pageID = ${pageNumber - 1}`;
      let nextquery = `
      select json_group_array(
        json_object('id',id,'pageID',pageID,'words',
        (select json_group_array(
          json_object(
          'text',text,'chapterCode',chapterCode,'isNewChapter',isNewChapter
          )
        )
        from word where word.lineID = line.id)
        )) from line where pageID = ${pageNumber + 1}`;
      tx.executeSql(
        query,
        [],
        (_, s) => {
          const rows = s.rows._array;
          let json = Object.values(rows[0]);
          let data = JSON.parse(json);
          setLines(data);

          // setData(data);
        },
        errorCB
      );
      tx.executeSql(
        prevquery,
        [],
        (_, s) => {
          const rows = s.rows._array;
          let json = Object.values(rows[0]);
          let data = JSON.parse(json);
          setLines(data);

          // setData(data);
        },
        errorCB
      );
      tx.executeSql(
        nextquery,
        [],
        (_, s) => {
          const rows = s.rows._array;
          let json = Object.values(rows[0]);
          let data = JSON.parse(json);
          setLines(data);

          // setData(data);
        },
        errorCB
      );
      let ids: any = [];
    });
  }, [pageNumber]);

  return (
    <Box
      mt="8"
      alignContent={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100%"
      flex="1"
    >
      {pageNumber}
      <FlatList
        data={[prevPage, lines, nextPage]}
        renderItem={({ item, index }) => {
          return (
            <Box key={index}>
              {item?.map((line, index) => {
                return (
                  <Box key={index} flexDirection={"row"}>
                    {line?.words?.map((word, index) => {
                      if (word.isNewChapter) {
                        return (
                          <Text
                            key={index}
                            fontFamily={"surahname"}
                            color="white"
                            fontSize={"25.5px"}
                            lineHeight={47}
                          >
                            {word.chapterCode}surah
                          </Text>
                        );
                      }
                      return (
                        <Text
                          key={index}
                          color="white"
                          fontSize={"25.5px"}
                          lineHeight={47}
                          style={{ fontFamily: `p${line.pageID}` }}
                        >
                          {word.text}
                        </Text>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          );
        }}
      />
      <Pressable
        py="2"
        position={"absolute"}
        left="0"
        height={"100%"}
        px="10"
        onPress={() => setPageNumber(pageNumber - 1)}
      />
      <Pressable
        py="2"
        position={"absolute"}
        right="0"
        height={"100%"}
        px="10"
        onPress={() => setPageNumber(pageNumber + 1)}
      />
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
