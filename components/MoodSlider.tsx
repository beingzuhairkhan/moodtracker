import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Slider from "@react-native-community/slider";

const MoodSlider = ({ moodScale, setMoodScale }: any) => {
  return (
    <React.Fragment>
      <Text style={styles.label}>Mood Scale: {moodScale}/5</Text>
      <Slider
        value={moodScale}
        minimumValue={1}
        maximumValue={5}
        step={1}
        onValueChange={(value) => setMoodScale(value)}
        style={styles.slider}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 20,
  },
});

export default MoodSlider;
