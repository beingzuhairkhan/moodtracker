import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AIInsight = ({ insight }: any) => {
  if (!insight) return null;

  return (
    <View style={styles.result}>
      <Text style={styles.resultTitle}>AI Insight:</Text>
      <Text style={styles.resultText}>{insight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AIInsight;
