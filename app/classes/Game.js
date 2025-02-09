import { db } from "@/FirebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

class Game {
    constructor() {
        this.game_code = '',
        this.state ={
            status: '',
            category: '',
            host: '',
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
                this.game_code = game_code
                this.state = docSnap.data()
                this.state.players[player.username] = player.state
                const gameRef = doc(db, "game-sessions", this.game_code);
                await updateDoc(gameRef, {
                    players: this.state.players
                });
                console.log("Game Joined", this.game_code)
            } else {
                console.log("No game found")
            }
        } catch (e) {
            console.error("Error finding document: ",game_code,'->',e);
        }
    };
}

export default Game;