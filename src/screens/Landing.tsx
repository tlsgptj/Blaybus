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
} from "react-native";
import { SvgProps } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "@/assets/images/LOGO.svg";
import LandingImport1 from "@/assets/images/landingImport1.svg";
import LandingImport2 from "@/assets/images/landingImport2.svg";
import Login from "../screens/Login";

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  Svg: React.FC<SvgProps>;
  texts?: {
    text: string;
    fontSize: number;
    fontWeight?: "normal" | "bold";
  }[];
};
{/* 
  const slides: Slide[] = [
    {
      id: "1",
      Svg: Logo,
    },
    {
      id: "2",
      texts: [
        { text: "경험치와 즐거움", fontSize: 28, fontWeight: "bold" },
        { text: "경험치를 얻어 일 속에", fontSize: 20 },
        { text: "즐거움을 얻어보세요!", fontSize: 20 },
      ],
      Svg: LandingImport1,
    },
    {
      id: "3",
      texts: [
        { text: "내 눈으로 직접", fontSize: 28, fontWeight: "bold" },
        { text: "확인하는 내 성과", fontSize: 28, fontWeight: "bold" },
        { text: "한 번의 클릭으로 내 성과를", fontSize: 20 },
        { text: "확인해보세요!", fontSize: 20 },
      ],
      Svg: LandingImport2,
    },
  ];
  */}

const Stack = createStackNavigator();

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
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
        renderItem={({ item }) => {
          const SvgComponent = item.Svg;
          return (
            <View style={[styles.slide, { width }]}>
              <SvgComponent width={200} height={200} style={styles.image} />
              {item.texts &&
                item.texts.map((textItem, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.text,
                      {
                        fontSize: textItem.fontSize,
                        fontWeight: textItem.fontWeight || "normal",
                      },
                    ]}
                  >
                    {textItem.text}
                  </Text>
                ))}
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            currentIndex === 2 ? styles.buttonEnabled : styles.buttonDisabled,
          ]}
          onPress={() => {
            if (currentIndex === 2) {
              navigation.navigate("Login");
            }
          }}
          disabled={currentIndex !== 2}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
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

