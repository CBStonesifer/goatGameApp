import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import HostGame from "./components/HostGame"
import JoinGame from "./components/JoinGame"

function HomeScreen() {
  const [showHost, setHostOrJoin] = useState(true);
  
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
      <Button
        title="How to Play"
        onPress={() => router.push('./screens/Description')}
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topSection: {
    paddingTop:60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#ffcccb',
  },
  middleSection: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
  },
  bottomSection: {
    flex: 1,
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