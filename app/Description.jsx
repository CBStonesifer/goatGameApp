import { Text, View } from 'react-native';
import { GameContext } from './GameContext';
import { useContext } from 'react';

function Description(){

  return (
    <View>
      <Text style={{paddingTop:60}}>Details Screen {gameCode}</Text>
    </View>
  );
};

export default Description;
