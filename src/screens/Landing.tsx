import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { authNavigations } from "../constants";

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  image: any; 
  texts?: {
    text: string;
    fontSize: number;
    fontWeight?: "normal" | "bold";
  }[];
};

const slides: Slide[] = [
  {
    id: "1",
    image: require("../assets/images/LOGO.png"), 
  },
  {
    id: "2",
    image: require("../assets/images/chart.png"), 
    texts: [
      { text: "경험치와 즐거움", fontSize: 28, fontWeight: "bold" },
      { text: "경험치를 얻어 일 속에", fontSize: 20 },
      { text: "즐거움을 얻어보세요!", fontSize: 20 },
    ],
  },
  {
    id: "3",
    image: require("../assets/images/glass.png"), 
    texts: [
      { text: "내 눈으로 직접", fontSize: 28, fontWeight: "bold" },
      { text: "확인하는 내 성과", fontSize: 28, fontWeight: "bold" },
      { text: "한 번의 클릭으로 내 성과를", fontSize: 20 },
      { text: "확인해보세요!", fontSize: 20 },
    ],
  },
];

type AuthStackParamList = {
  [authNavigations.LOGIN]: undefined;
}

const LandingPage: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleStart = () => {
    navigation.navigate(authNavigations.LOGIN);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>            
            <Image source={item.image} style={styles.image} />
            {item.texts &&
              item.texts.map((textItem, index) => (
                <Text
                  key={index}
                  style={[styles.text, { fontSize: textItem.fontSize, fontWeight: textItem.fontWeight || "normal" }]}
                >
                  {textItem.text}
                </Text>
              ))}
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={currentIndex === slides.length - 1 ? styles.buttonEnabled : styles.buttonDisabled}
          disabled={currentIndex !== slides.length - 1}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: "#fff",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  buttonEnabled: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonDisabled: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
});

export default LandingPage;