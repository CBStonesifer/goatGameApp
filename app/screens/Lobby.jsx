import { useGameContext } from '../../context/GameContext';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

function Lobby(){

  const { gameModel, resetGame, local_player, updateGameState } = useGameContext()

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
      <Button
                title="Exit"
                onPress={() => {
                  if(local_player.username !== gameModel.state.host){
                    resetGame()
                    console.log('Player ', local_player.username, ' left')
                  }
                  else{
                    console.log('Game Ended')
                    updateGameState({'status':'gameOver'})
                  }
                  router.replace('/')
                }}
            />
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <Text>{gameModel.game_code} : {gameModel.state.status}</Text>
        <Text>Waiting for players...</Text>
        {Object.entries(gameModel.state.players).map(([username, playerData], index) => (
                <Text 
                key={`player-${username}-${index}`} 
                index={username}>
                  {username}
                </Text>
            ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {(local_player.username == gameModel.state.host) ? <Button
                title="Start Game"
                onPress={() => {
                  updateGameState({'status':'inGame'})
                }}
            /> :null}
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

export default Lobby;
