import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Word = () => {
  const [words, setWords] = useState(null);
  useEffect(() => {
    let verses = ayahs.map((item) => {
      return item.text;
    });
    let wordsArray = verses.map((item) => {
      return item.split(" ");
    });
    setWords(wordsArray.flat(1));
  }, []);
  return (
    <View>
      <Text>Word</Text>
    </View>
  );
};

export default Word;
