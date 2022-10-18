import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.deleteLabeledSong(this.index);
    }
    
    undoTransaction() {
        this.store.addSong(this.index, this.song);
    }
}