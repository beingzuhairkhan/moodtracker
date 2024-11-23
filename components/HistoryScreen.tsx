import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const HistoryScreen = ({ route }: any) => {
  const { history } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.historyTitle}>Mood History</Text>
      {history.length > 0 ? (
        history.map((entry: any, index: number) => (
          <View key={index} style={styles.historyItem}>
            <Text>
              <Text style={styles.bold}>Date:</Text> {new Date(entry.date).toLocaleDateString()}
            </Text>
            <Text>
              <Text style={styles.bold}>Mood:</Text> {entry.mood}/5
            </Text>
            <Text>
              <Text style={styles.bold}>Insight:</Text> {entry.insight}
            </Text>
          </View>
        ))
      ) : (
        <Text>No mood history available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default HistoryScreen;
