import { db } from "@/FirebaseConfig";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useGameContext } from './GameContext'

function HostGame(){
    const {gameCode , setGameCode} = useGameContext()
    const[gameHost, setGameHost] = useState('')
    const[gameCategory, setgameCategory] = useState('')


    //firebase function to create new game: need to develop a Game Class for the schema
    //  //will need to also create a player class to be added into the Game Class

    //to be replaced with a FireBase Function that can check no repeat codes
    function generateGameCode(){
        let result = '';
        for (let i = 0; i < 6; i++) {
            let randomIndex = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
            result += randomIndex;
        }
        setGameCode(result)
    }

    async function createGame(){
        generateGameCode()
        console.log(gameCode)
        const game = {
            game_code: gameCode,
            game_host: gameHost,
            game_Category: gameCategory
        }
        try {
            const docRef = await addDoc(collection(db, "game-sessions"), {
              game
            });
            router.push('/Description')
            console.log("Document written with ID: ", docRef.id);
            console.log('Entered Lobby')
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }

  return (
    <View style={spacing.container}>
      {/* Top Section */}
      <View style={spacing.topSection}>
        <Text style={styles.text}>Host New Game</Text>
      </View>

      {/* Middle Section */}
      <View style={spacing.middleSection}>
            <TextInput style={styles.input} placeholder="Username" value={gameHost} onChangeText={setGameHost}/>
            <TextInput style={styles.input} placeholder="Category" value={gameCategory} onChangeText={setgameCategory}/>
            <Button
                title="Create Game"
                onPress={() => {
                    createGame()
                }}
            />
      </View>

      {/* Bottom Section */}
      <View style={spacing.bottomSection}>
      </View>
    </View>
  );
};
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
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
    text: {
      fontSize: 36,
      fontWeight: 'bold',
    }
  });

  const spacing = StyleSheet.create({
    container: {
        width: width,
        flex: 2,
        backgroundColor: '#f8f8f8',
      },
    topSection: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: '#aacccb',
    },
    middleSection: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#add8e6',
    },
    bottomSection: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#90ee90',
    }
});

export default HostGame;


//replace does not allow moving back a screen
//push just layers a screen ontop
