import { router } from "expo-router";
import React, { useState, createContext, useContext } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import HostGame from "./HostGame"
import JoinGame from "./JoinGame"
import GameContextProvider from './GameContext'

function HomeScreen() {
  const [showHost, setHostOrJoin] = useState(true);
  
  return (
    <GameContextProvider>
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
        <Button
          title="How to Play"
          onPress={() => router.push('/Description')}
        />
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          {showHost ? <HostGame /> : <JoinGame />}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Button 
            title={showHost ? "Switch to Join": "Switch to Host"}
            onPress={() => setHostOrJoin(!showHost)} 
          />
        </View>
      </View>
    </GameContextProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen height
    backgroundColor: '#f8f8f8',
  },
  topSection: {
    paddingTop:60,
    flex: 1, // Takes 1/3 of the screen
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#ffcccb',
  },
  middleSection: {
    flex: 6, // Takes 2/3 of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
  },
  bottomSection: {
    flex: 1, // Takes 1/3 of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90ee90',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default HomeScreen;