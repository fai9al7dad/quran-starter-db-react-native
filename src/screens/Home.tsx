import { Box, FlatList, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  ListRenderItem,
  TextInput,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { Surah } from "../assets/types";
import { surahs } from "../assets/json/API.json";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home: React.FC = () => {
  const [data, setData] = useState<Surah | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    surahs ? setData(surahs) : null;
  });

  return (
    <Box
      mt="8"
      px="2"
      alignItems="center"
      mx="4"
      justifyContent={"center"}
      flex="1"
    >
      <Box
        flexDirection="row"
        alignItems={"center"}
        justifyContent="center"
        borderBottomWidth="1"
        borderColor={"white"}
        mt="12"
        mb={2}
      >
        <Ionicons
          style={{ padding: 10 }}
          name="ios-search"
          size={22}
          color="white"
        />
        <TextInput
          style={{
            color: "white",
            flex: 1,
            textAlign: "right",
            fontSize: 18,
          }}
          // onChangeText={(text) => searchSurah(text)}
        />
      </Box>
      <Box width="100%">
        <FlatList
          keyExtractor={(item) => item.number.toString()}
          data={data}
          indicatorStyle="white"
          renderItem={({ item, index }) => {
            let pageNumber = item.ayahs[0].page;
            return (
              <Pressable
                key={item.number}
                borderBottomWidth={1}
                borderColor="gray.800"
                py="2"
                alignItems={"center"}
                justifyContent="flex-start"
                flexDirection="row"
                onPress={() =>
                  navigation.navigate("Surah", {
                    surah: item,
                    pageNumber: pageNumber,
                  })
                }
              >
                <Box
                  bg="gray.700"
                  alignItems={"center"}
                  justifyContent="center"
                  width={7}
                  height={7}
                  mr="4"
                  rounded={"full"}
                >
                  {item.number}
                </Box>
                <Box alignItems={"flex-start"}>
                  <Text fontSize={"2xl"} color="white">
                    {item.name}
                  </Text>
                  <Text color={"gray.400"}>{item?.ayahs?.length} آية</Text>
                </Box>
              </Pressable>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default React.memo(Home);

// const searchSurah = (text) => {
//   console.log(text);
//   let query = data.filter((item) => {
//     return item.name === "سُورَةُ ٱلْفَاتِحَةِ";
//   });
//   setData(query);
//   // setData(query);
// };
