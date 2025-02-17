import { Button, Text, View } from 'react-native';
import { useGameContext } from '../../context/GameContext';
import { Timestamp } from 'firebase/firestore';

function Description(){

  const { gameModel } = useGameContext()

  return (
      <View>
        <Text style={{paddingTop:60}}>Details Screen: {gameModel.host}</Text>
        <Button title = "See Code" onPress={()=>{console.log(Timestamp.now().seconds)}}></Button>
      </View>
  );
};

export default Description;
