import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatbotHome from './App/Pages/ChatbotHome';
import { NavigationContainer } from '@react-navigation/native';
import ChatbotHomeNavigation from './App/Navigation/ChatbotHomeNavigation';

export default function App() {
   return (
    <View style={styles.container}>
      {/*<ChatbotHome/>*/}
      <NavigationContainer>
        <ChatbotHomeNavigation/>
      </NavigationContainer>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

