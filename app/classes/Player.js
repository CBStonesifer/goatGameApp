class Player {
    constructor(username) {
        this.username = username,
        this.state ={
            bids: [],
            entries: [],
            readyUp: false,
            balance: 10
        }
    }

    instantiatePlayer(username){
        this.username = username
    }
}


export default Player;