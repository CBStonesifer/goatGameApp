import React, { createContext, useContext, useState } from "react";

export const GameContext = createContext();

export default function GameContextProvider ({children}){
    const [gameModel, setGameModel] = useState({
        category: '',
        host: '',
        game_code: '',
        players: {}
    });

    // Add any methods you want to expose
    function updateGameData(gameData){
        setGameModel(prevGameData => ({
            ...prevGameData,
            ...gameData
        }));
    };

    // Value object that will be available to consumers
    const value = {
        gameModel,
        updateGameData,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

// Custom hook for using this context
export function useGameContext() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
        return context;
 };