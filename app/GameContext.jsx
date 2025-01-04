import React, { createContext, useContext, useState } from "react";

export const GameContext = createContext(undefined);

export default function GameContextProvider({ children }){
    const [gameCode, setGameCode] =  useState('')

    return(
        <GameContext.Provider value={{
            gameCode, 
            setGameCode,
            }}
        >
            {children}
        </GameContext.Provider>

    )
}

export function useGameContext(){
    const context = useContext(GameContext)
    if(!context){
        throw new Error('Please use context within provider');
    }
    return context;
}