import { useGameContext } from '../../context/GameContext';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore';

function Auciton(){

  const { local_player, gameModel, updateGameState } = useGameContext()
  const [seconds, setSeconds] = useState(30);

  const [bidPlaced, flagBidPlace] = useState(false)

  function submitBid(){} //reset clock, increment bid, update bids, increment player

  function bidCondition(){} //if time expires and no bid was placed, issue it to the next player
                            //need to record the entry and player start in case it laps once it auto-submits for a 0 bid


  useEffect(() => {
    if (seconds <= 0){
      setSeconds(30)
    }
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);
  

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text>{gameModel.state.category}</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <Text style={styles.timerText}>{seconds}s</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topSection: {
    paddingTop:60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  input: {
    height: 50,
    width: width/1.5,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',  
    color: '#000',            
    fontSize: 16,
  }, 
});

const entryStyles = StyleSheet.create({
  container: {
    padding: 5,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    padding: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Auciton;