import { Button, Text, View } from 'react-native';
import GameContextProvider, { useGameContext } from '../context/GameContext';

function Description(){

  const { gameModel } = useGameContext()

  return (
    <GameContextProvider>
      <View>
        <Text style={{paddingTop:60}}>Details Screen: {gameModel.host}</Text>
        <Button title = "See Code" onPress={()=>{console.log(gameModel.game_code)}}></Button>
      </View>
    </GameContextProvider>
  );
};

export default Description;
