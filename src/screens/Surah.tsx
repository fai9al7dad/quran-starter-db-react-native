import React, { useEffect, useState } from "react";
import { Ayah, RootStackParamList } from "../assets/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Pressable, ScrollView, Text } from "native-base";
import { ListRenderItem, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

type props = NativeStackScreenProps<RootStackParamList, "Surah">;

// const comparePageChange = (curItem: Ayah, prevItem: Ayah) => {
//   return curItem.page !== prevItem.page;
// };

const Surah: React.FC<props> = ({ route }: props) => {
  const { surah, pageNumber } = route.params;
  let surahName = surah?.name;
  // const pageNumber = route.params.pageNumber;
  const [verses, setVerses] = useState([]);
  const [words, setWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  useEffect(() => {
    axios
      .get(
        `https://api.quran.com/api/v4/quran/verses/code_v1?page_number=${currentPage}`
      )
      .then((res) => {
        setVerses(res.data.verses);

        // to get surah number to use it as key for surahInfo
        // let surahNumber = res.data.data.ayahs[0].surah.number.toString();

        // setVerses(res.data.data.ayahs);
        // let surahInfo = res.data.data.surahs[surahNumber];
        // setSurahName(surahInfo.name);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, [currentPage]);
  return (
    <SafeAreaView>
      <Box height={"100%"}>
        <Box height="5%" alignItems={"center"} justifyContent="center">
          <Text color={"white"}>{surahName}</Text>
        </Box>
        <Box
          height="90%"
          alignItems={"center"}
          justifyContent={"center"}
          alignSelf="flex-start"
          px={"5"}
        >
          <Text
            color="white"
            fontFamily={`p${currentPage}`}
            textAlign="justify"
            fontSize={25}
          >
            {verses.map((item, index) => {
              return (
                <>
                  <Text key={item.id}>{item.code_v1}</Text>
                </>
              );
            })}
          </Text>
        </Box>

        <Box
          flexDirection={"row"}
          justifyContent="center"
          alignItems={"center"}
          flex={1}
          height="5%"
        >
          <Text color={"white"}>{currentPage}</Text>
        </Box>
        <Pressable
          py="2"
          position={"absolute"}
          left="0"
          height={"100%"}
          px="10"
          onPress={() => setCurrentPage(currentPage - 1)}
        />
        <Pressable
          py="2"
          position={"absolute"}
          right="0"
          height={"100%"}
          px="10"
          onPress={() => setCurrentPage(currentPage + 1)}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Surah;
