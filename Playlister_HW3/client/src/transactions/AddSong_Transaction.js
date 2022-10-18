import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.addSong(this.index, this.song);
    }
    
    undoTransaction() {
        this.store.deleteLabeledSong(this.index);
    }
}