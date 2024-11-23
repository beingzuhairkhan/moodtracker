import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const MoodGraph = ({ history }: any) => {
  const moodData = history.map((entry: any) => ({
    date: new Date(entry.date).toLocaleDateString(),
    mood: entry.mood,
  }));

  const graphData = {
    labels: moodData.map((entry:any) => entry.date),
    datasets: [
      {
        data: moodData.map((entry:any) => entry.mood),
      },
    ],
  };

  if (history.length === 0) return null;

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphTitle}>Mood Graph</Text>
      <LineChart
        data={graphData}
        width={Dimensions.get("window").width - 40} // Adjust width
        height={220}
        yAxisLabel=""
        yAxisSuffix=" / 5"
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MoodGraph;
