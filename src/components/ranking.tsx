import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Man1 from "../assets/images/man1.svg";
import BronzeMedal from "../assets/images/bronzeMedal.svg";
import SilverMedal from "../assets/images/silverMedal.svg";
import GoldMedal from "../assets/images/goldMedal.svg";


interface RankItemProps {
    rank : number;
    name : string;
    team : string;
    progress : number;
}

export default function RankingItem({ rank, name, team, progress } : RankItemProps) {

    const getMedal = () => {
        if (rank === 1) return <GoldMedal width={24} height={24} />;
        if (rank === 2) return <SilverMedal width={24} height={24} />;
        if (rank === 3) return <BronzeMedal width={24} height={24} />;
        return null;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>
      <View style={styles.profileContainer}>
        <Man1 width={40} height={40} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.team}>{team}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progress}%</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%` }, 
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
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
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  team: {
    fontSize: 12,
    color: "#888",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
  },
  progressBar: {
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#666",
  },
});
