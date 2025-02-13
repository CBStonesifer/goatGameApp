import { useGameContext } from '../../context/GameContext';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from "react-native";
import { useEffect, useState } from 'react'

function Entries(){

  const { local_player, gameModel, updateGameState } = useGameContext()
  const [ entry, setEntry ] = useState('')
  const [ submissions, setSubmissions ] = useState([])
  const [ readyState, setReadyState ] = useState(false)

  function handleSubmit(){
    // Hard Coding 3 for initial gameplay
    if (entry != '' & submissions.length < 3){
      setSubmissions(prevSubmissions => [...prevSubmissions, entry])
      setEntry('')
      console.log(submissions.length)
    }
  }

  function handleDelete(removeEntry){
    setSubmissions(submissions.filter(item => item !== removeEntry));
  };

  function launchAuction(){
    let startAuction = true
    if(local_player.username == gameModel.state.host & gameModel.state.status == 'inGame'){
      console.log(gameModel.state.players)
      //not done here...
      for (var p in gameModel.state.players){
        startAuction = (startAuction & p.readyUp)
      }
      console.log('All players ready?:', startAuction)
      // if (startAuction){
      //   updateGameState({'status':'inAuction'})
      // }
    }
  }

  function toggleReadyUp(){
    if (submissions.length == 3){
      setReadyState(!readyState)
      updateGameState({[`players.${local_player.username}.readyUp`]:!readyState})
      updateGameState({[`players.${local_player.username}.entires`]:submissions})
    }
    //Logic to post entries and state to firebase doc
  }
  
  useEffect(() => {
    if (submissions.length != 3){
      setReadyState(false)
      updateGameState({[`players.${local_player.username}.readyUp`]:false})
    }
  }, [submissions]);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text>{gameModel.state.category}</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
      {submissions?.map((item, idx) => (
            <EntryComponent key={idx} item={item} index ={idx} onRemove={() => handleDelete(item)}/>            
        ))}
        <Text>Category: {gameModel.state.category}</Text>
        <Text>Submit your entries...</Text>
        <TextInput style={styles.input} placeholder="Entry" value={entry} onChangeText={setEntry}/>
        <Button title='Submit' onPress={handleSubmit}>Submit</Button>
        <Button title={readyState?'Unready':'Ready'} onPress={toggleReadyUp}/>
        <Text>Player States:</Text>
        {Object.entries(gameModel.state.players).map(([username, playerData], index) => (
                <Text 
                  key={`player-${username}-${index}`} 
                  index={username}>
                  {username}{'->'}{playerData.readyUp ? 'Ready':'Unready'}
                </Text>
            ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {(local_player.username == gameModel.state.host) ? <Button
                        title="Launch Auction"
                        onPress={() => {
                          launchAuction()
                          //router.replace('../screens/Entries')
                        }}
                    /> :null}
      </View>
    </View>
  );
}

const EntryComponent = ({item, onRemove}) =>{

  return (
    <View style={entryStyles.entry}>
      <Text>{item}</Text>
      <Button title=' X ' onPress={onRemove}/>
    </View>
  )
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

export default Entries;


/*
<Text 
                key={`player-${username}-${index}`} 
                index={username}>
                  {username}{'->'}{playerData.readyUp ? 'Ready':'Unready'}
                </Text>
*/