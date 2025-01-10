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

    async instantiateGame(game_code, status, category, host){
        this.game_code = game_code
        this.state.status = status
        this.state.category = category
        this.state.host = host
        this.state.players[host] = {
            balance: 10,
            entires: [],
            bids:[]
        }
        try {
            const gameRef = doc(db, "game-sessions", this.game_code);
            await setDoc(gameRef, this.state);
            console.log("Game Created", this.game_code)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export default Game;