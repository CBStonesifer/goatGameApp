import React, { createContext, useContext, useState } from "react";
import Game from '../app/classes/Game'

export const GameContext = createContext();

export default function GameContextProvider ({children}){
    const [gameModel, setGameModel] = useState(new Game());
    // instantiate local player: create Player Class

    async function createGameData(game_code, status, category, host){
        const newGame = new Game()
        try{
            await newGame.instantiateGame(game_code, status, category, host).then(()=>{
                setGameModel(newGame)
            })
        } catch (e){
            console.error('Failed to save state to firebase')
        }
    };

    const value = {
        gameModel,
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