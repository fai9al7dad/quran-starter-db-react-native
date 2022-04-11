import React, { useEffect, useState } from "react";
import { Ayah, RootStackParamList } from "../assets/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Divider, Pressable, ScrollView, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
import { Verses } from "../assets/json/hafs.json";
type props = NativeStackScreenProps<RootStackParamList, "Surah">;

// const comparePageChange = (curItem: Ayah, prevItem: Ayah) => {
//   return curItem.page !== prevItem.page;
// };

const Surah: React.FC<props> = ({ route }: props) => {
  const { surah, pageNumber } = route.params;
  let surahName = surah?.name;
  // const pageNumber = route.params.pageNumber;
  const [verses, setVerses] = useState([]);
  // const [words, setWords] = useState([]);
  const [juzNumber, setJuzNumber] = useState();
  // const [currentPage, setCurrentPage] = useState(pageNumber);
  
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${currentPage}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setVerses(res.data.verses);
  //       setJuzNumber(verses[0].juz_number);
  //       // to get surah number to use it as key for surahInfo
  //       // let surahNumber = res.data.data.ayahs[0].surah.number.toString();

  //       // setVerses(res.data.data.ayahs);
  //       // let surahInfo = res.data.data.surahs[surahNumber];
  //       // setSurahName(surahInfo.name);
  //     })
  //     .catch((e) => {
  //       console.log(e.response.data);
  //     });
  // }, [currentPage]);
  return (
    <SafeAreaView>
      <Box height={"100%"} bg="#fff9ef">
        <Box
          height="5%"
          flexDirection={"row"}
          alignItems={"center"}
          px="2"
          justifyContent="space-between"
        >
          <Text color={"#000"}>{surahName}</Text>
          <Text color={"#000"}>الجزء {juzNumber}</Text>
        </Box>
        <Box height={"90%"} justifyContent="center" alignItems={"center"}>
          <Box height="100%" px="4">
            <Text
              color="#000"
              fontSize={25}
              textAlign="justify"
              fontFamily={"Hafs"}
            >
              {verses.map((verse) => {
                return <Text>{verse.text_uthmani}</Text>;
              })}
            </Text>
          </Box>
        </Box>

        <Box
          flexDirection={"row"}
          justifyContent="center"
          alignItems={"center"}
          flex={1}
          height="5%"
          bg="gray.600"
        >
          {/* <Text color={"white"}>{currentPage}</Text> */}
        </Box>
        <Pressable
          py="2"
          position={"absolute"}
          left="0"
          height={"100%"}
          px="10"
          // onPress={() => setCurrentPage(currentPage - 1)}
        />
        <Pressable
          py="2"
          position={"absolute"}
          right="0"
          height={"100%"}
          px="10"
          // onPress={() => setCurrentPage(currentPage + 1)}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Surah;
