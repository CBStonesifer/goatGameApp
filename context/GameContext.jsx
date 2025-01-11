import React, { createContext, useContext, useState } from "react";
import Game from '../app/classes/Game'
import Player from '../app/classes/Player'

export const GameContext = createContext();

export default function GameContextProvider ({children}){
    const [gameModel, setGameModel] = useState(new Game());
    const [local_player, setPlayer] = useState(new Game());
    // instantiate local player: create Player Class

    async function createGameData(game_code, status, category, host){
        const newGame = new Game()
        const newPlayer = new Player(host)
        try{
            await newGame.instantiateGame(game_code, status, category, newPlayer).then(()=>{
                setGameModel(newGame)
                setPlayer(newPlayer)
            })
        } catch (e){
            console.error('Failed to save state to firebase')
        }
    };

    const value = {
        gameModel,
        local_player,
        createGameData,
    };

    return (
        <GameContext.Provider value={value}>
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