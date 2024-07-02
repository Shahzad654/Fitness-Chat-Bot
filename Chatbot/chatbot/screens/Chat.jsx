import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Appbar, Text, Button } from "react-native-paper";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC7wutVlGWr46lNH4mssMNQDDKJMpMoBis"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm Fit-Bot, your fitness companion. Ask me anything! 💪",
      fromAI: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [
        ...messages,
        { id: Date.now().toString(), text: input, fromAI: false },
      ];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const chatSession = model.startChat({
          generationConfig,
          history: [{ role: "user", parts: [{ text: input }] }],
        });

        const result = await chatSession.sendMessage(input);
        setMessages([
          ...newMessages,
          {
            id: Date.now().toString(),
            text: result.response.text(),
            fromAI: true,
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={item.fromAI ? styles.aiBubble : styles.userBubble}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Fit-Bot" />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask Anything..."
          value={input}
          onChangeText={setInput}
        />
        <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    padding: 10,
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e1ffc7",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#alffc7",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    color: "#000",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    borderRadius: 20,
    backgroundColor:'gray'
  },
});

export default Chat;
