import React, { useState, useEffect } from "react";
import { ScrollView, Text, Button, ActivityIndicator, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MoodSlider from './MoodSlider';
import MoodDescription from './MoodDescription';
import AIInsight from './AIInsight';
import MoodGraph from './MoodGraph'

const AppScreen = ({ navigation }: any) => {
  const [moodScale, setMoodScale] = useState<number>(3);
  const [moodDescription, setMoodDescription] = useState<string>("");
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<{ date: string; mood: number; insight: string }[]>([]);

  const fetchAIInsight = async () => {
    if (!moodDescription.trim()) {
      Alert.alert("Validation Error", "Please provide a brief description of your mood.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "user",
              content: `The user is feeling ${moodScale}/5. Mood description: "${moodDescription}". Provide insights or suggestions for improving their mood.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data?.choices?.[0]?.message?.content?.trim();
      if (aiResponse) {
        setInsight(aiResponse);
        const entry = { date: new Date().toISOString(), mood: moodScale, insight: aiResponse };
        const updatedHistory = [entry, ...history];
        setHistory(updatedHistory);
        await AsyncStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
      } else {
        Alert.alert("Error", "Failed to fetch AI insights. Please try again.");
      }
    } catch (error) {
     
      Alert.alert("Error", "Failed to fetch AI insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await AsyncStorage.getItem("moodHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    };
    loadHistory();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Mood Tracker with AI Insights</Text>

      <MoodSlider moodScale={moodScale} setMoodScale={setMoodScale} />
      <MoodDescription moodDescription={moodDescription} setMoodDescription={setMoodDescription} />

      <View style={{ marginTop: 20 }}>
        <Button title="Get AI Insight" onPress={fetchAIInsight} disabled={loading} />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />}

      <AIInsight insight={insight} />

      <View style={{ marginTop: 20 }}>
        <Button title="View Mood History" onPress={() => navigation.navigate("History", { history })} />
      </View>

      <MoodGraph history={history} />
    </ScrollView>
  );
};

export default AppScreen;
