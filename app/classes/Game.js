import { db } from "@/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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

    async instantiateGame(game_code, status, category, player){
        this.game_code = game_code
        this.state.status = status
        this.state.category = category
        this.state.host = player.username
        this.state.players[player.username] = player.state
        try {
            const gameRef = doc(db, "game-sessions", this.game_code);
            console.log(JSON.stringify(this.state))
            await setDoc(gameRef, this.state);
            console.log("Game Created", this.game_code)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export default Game;