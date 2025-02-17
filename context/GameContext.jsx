import React, { createContext, useContext, useState, useEffect } from "react";
import Game from '../app/classes/Game'
import Player from '../app/classes/Player'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "@/FirebaseConfig";
import { router } from "expo-router";

export const GameContext = createContext();

export default function GameContextProvider ({children}){
    const [gameModel, setGameModel] = useState(new Game());
    const [local_player, setPlayer] = useState(new Player());

    function resetGame(){
        gameModel.removePlayer(local_player.username)
        setGameModel(new Game())
        setPlayer(new Player())
    }

    async function createGameData(game_code, status, category, host){
        const newGame = new Game()
        const newPlayer = new Player(host)
        try{
            await newGame.createGame(game_code, status, category, newPlayer).then(()=>{
                setGameModel(newGame)
                setPlayer(newPlayer)
            })
        } catch (e){
            console.error('Failed to save state to firebase')
        }
    };

    async function joinGameData(game_code, player){
        const newGame = new Game()
        const newPlayer = new Player(player)
        await newGame.loadGame(game_code, newPlayer).then((message)=>{
            setGameModel(newGame)
            setPlayer(newPlayer)
            return Promise.resolve(message);
        }).catch((error) => {
            return Promise.reject(error);
        });
    };
    

    async function updateGameState(payload){
        try{
            if (gameModel.game_code != ''){
                try {
                    const docRef = doc(db, 'game-sessions', gameModel.game_code);
                    updateDoc(docRef, payload);
                } catch { 
                    console.error("Error updating document: ",gameModel.game_code,'->',e);
                }}
            } catch {
            console.error('Failed to update state to firebase  ->')
        }
    };

    function followDocument(){
        if(gameModel.game_code) {
            const docRef = doc(db, 'game-sessions', gameModel.game_code)
            
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    // const currentTime = new Date();
                    // console.log(currentTime.toLocaleTimeString(), ': pre->', gameModel.state)
                    // console.log(currentTime.toLocaleTimeString(), ': new->', snapshot.data())
                    if(JSON.stringify(gameModel.state) !== JSON.stringify(snapshot.data())){
                        setGameModel(prevgameModel =>({
                            ...prevgameModel,
                            state: snapshot.data()
                        }));
                    }
                } else {
                    console.log(gameModel.game_code, ' -> Document not found');
                }
            });
            return () => unsubscribe();
        }
    };

    const externalContext = {
        gameModel,
        local_player,
        createGameData,
        joinGameData,
        updateGameState,
        followDocument,
        resetGame,
    };

    useEffect(() => {
        console.log('Document Changed')
        const unsubscribe = followDocument();
        return () => {
          if (unsubscribe) unsubscribe();
        };
      }, [gameModel]);

      useEffect(() => {
        console.log('State Changed')
        if (gameModel.state.status == 'gameOver'){
            setGameModel(new Game())
            setPlayer(new Player())
            router.replace('/')
        }
        if (gameModel.state.status == 'inGame'){
            router.replace('../screens/Entries')
        }
        if (gameModel.state.status == 'inAuction'){
            router.replace('../screens/Auction')
        }
        const unsubscribe = followDocument();
        return () => {
          if (unsubscribe) unsubscribe();
        };
      }, [gameModel.state.status]);

    return (
        <GameContext.Provider value={externalContext}>
            {children}
        </GameContext.Provider>
    );
};

export function useGameContext() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
        return context;
 };