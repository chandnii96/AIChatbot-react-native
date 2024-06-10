import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatbotHome from '../Pages/ChatbotHome';
import ChatScreen from '../Pages/ChatScreen';


const Stack=createNativeStackNavigator();
export default function ChatbotHomeNavigation() {
  return (
    <Stack.Navigator >
        <Stack.Screen name= 'Chatbot' component={ChatbotHome}/>
        <Stack.Screen name= 'chat' component={ChatScreen}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})