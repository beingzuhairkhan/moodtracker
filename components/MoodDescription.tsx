import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const MoodDescription = ({ moodDescription, setMoodDescription }: any) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Describe your mood briefly..."
      value={moodDescription}
      onChangeText={setMoodDescription}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});

export default MoodDescription;
