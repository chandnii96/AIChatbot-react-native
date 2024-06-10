import { View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import GlobalAPI from '../Services/GlobalAPI';

export default function ChatScreen() {
  const param = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChatFace, setSelectedChatFace] = useState();

  useEffect(() => {
    setSelectedChatFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am ' + param.selectedFace.name + ', How Can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.selectedFace?.image,
        },
      },
    ]);
  }, [param.selectedFace]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setLoading(true);
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (msg) => {
    console.log("Sending message to Bard API:", msg);
    GlobalAPI.getBardApi(msg)
      .then((resp) => {
        console.log("Received response from Bard API:", resp);
        setLoading(false);
        if (resp && resp.candidates && resp.candidates.length > 0 && resp.candidates[0].content) {
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.candidates[0].content.trim(),
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
        } else {
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: "Sorry, I cannot help you with it",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: param.selectedFace?.image,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAPIResp)
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching Bard API response:", error);
        setLoading(false);
        const chatAPIResp = {
          _id: Math.random() * (9999999 - 1),
          text: "Sorry, there was an error processing your request.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: param.selectedFace?.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatAPIResp)
        );
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

