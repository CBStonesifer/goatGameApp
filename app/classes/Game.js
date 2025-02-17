import { db } from "@/FirebaseConfig";
import { doc, setDoc, getDoc, updateDoc, deleteField } from "firebase/firestore";

class Game {
    constructor() {
        this.game_code = String(),
        this.state ={
            status: Boolean(),
            category: String(),
            host: String(),
            auction_timer: '',
            players: {}
        }
    }

    async createGame(game_code, status, category, player){
        this.game_code = game_code
        this.state.status = status
        this.state.category = category
        this.state.host = player.username
        this.state.players[player.username] = player.state
        try {
            const gameRef = doc(db, "game-sessions", this.game_code);
            await setDoc(gameRef, this.state);
            console.log("Game Created", this.game_code)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    async loadGame(game_code, player){
        try {
            const docRef = doc(db, "game-sessions", game_code);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const gameData = docSnap.data()
                if (gameData.status != "waiting"){
                    return Promise.reject("not in 'waiting' state");
                }
                else{
                    this.state = gameData
                    this.game_code = game_code
                    this.state.players[player.username] = player.state
                    const gameRef = doc(db, "game-sessions", this.game_code);
                    await updateDoc(gameRef, {
                        players: this.state.players,
                    });
                    return Promise.resolve("Game joined successfully");
                }
            } else {
                return Promise.reject("Game not found")
            }
        } catch (e) {
            console.error("Error finding document: ",game_code,'->',e);
            return Promise.reject("Game not found")
        }
    };

    async removePlayer(player_id){
        const gameDocRef = doc(db, 'game-sessions', this.game_code);

        try {
            await updateDoc(gameDocRef, {
                [`players.${player_id}`]: deleteField()
            });
            console.log(`Player ${player_id} successfully removed from the game.`);
        } catch (error) {
            console.error('Error removing player from Firestore:', error);
        }
    }
}

export default Game;