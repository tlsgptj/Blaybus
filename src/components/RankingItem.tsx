import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface RankingItemProps {
  rank: number;
  name: string;
  team: string;
  progress: number;
}

export default function RankingItem({ rank, name, team, progress }: RankingItemProps) {
  const getMedalImage = () => {
    if (rank === 1) {
      return require("../assets/images/GoldMedal.png");
    } else if (rank === 2) {
      return require("../assets/images/SilverMedal.png");
    } else if (rank === 3) {
      return require("../assets/images/BronzeMedal.png");
    }
    return null; 
  };

  return (
    <View style={styles.container}>
      {rank <= 3 ? (
        <Image source={getMedalImage()} style={styles.rankImage} />
      ) : (
        <Text style={styles.rank}>{rank}</Text>
      )}
      <View style={styles.profileContainer}>
        <Image source={require("../assets/images/man2.png")} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.team}>{team}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progress}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    width: 30, 
    textAlign: "center",
  },
  rankImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  profileContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 14, fontWeight: "bold" },
  team: { fontSize: 12, color: "#888" },
  progressContainer: { alignItems: "center", justifyContent: "center" },
  progressText: { fontSize: 14, marginBottom: 5 },
  progressBar: { width: 100, height: 8, borderRadius: 4, backgroundColor: "#f2f2f2" },
  progressFill: { height: "100%", borderRadius: 4, backgroundColor: "#666" },
});

