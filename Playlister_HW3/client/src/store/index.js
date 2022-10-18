import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import api from '../api'
import DeleteListModal from '../components/DeleteListModal';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_THE_LIST: "DELETE_THE_LIST",
    CLOSE_DELETE_LIST_MODAL: "CLOSE_DELETE_LIST_MODAL",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    ADD_SONG_TO_CURRENT_LIST: "ADD_SONG_TO_CURRENT_LIST",
    MOVE_SONGS_IN_THE_LIST: "MOVE_SONGS_IN_THE_LIST",
    MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
    EDIT_THE_SONG: "EDIT_THE_SONG",
    CLOSE_EDIT_SONG_MODAL: "CLOSE_EDIT_SONG_MODAL",
    MARK_SONG_FOR_DELETING: "MARK_SONG_FOR_DELETING",
    DELETE_THE_SONG: "DELETE_THE_SONG",
    CLOSE_DELETE_SONG_MODAL: "CLOSE_DELETE_SONG_MODAL"
}

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    DELETE_SONG : "DELETE_SONG"
}


// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        idNamePairs: [],
        individualIdNamePair: null, //THE PARTICULAR LIST WE WISH TO DELETE
        labeledSongToEdit: null, //THE PARTICULAR SONG WE WISH TO EDIT
        labeledSongToEditIndex: 0,
        labeledSongToDelete: null,
        labeledSongToDeleteIndex: 0,
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
    });


    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // ADDING SONG IN THE LIST
            case GlobalStoreActionType.ADD_SONG_TO_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // MOVING THE SONGS IN THE LIST
            case GlobalStoreActionType.MOVE_SONGS_IN_THE_LIST: {
                return setStore({
                    idNamePairs : store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal: payload.modalState,
                    idNamePairs: store.idNamePairs,
                    individualIdNamePair: payload.specificList,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // CLOSE THE DELETE LIST MODAL WITHOUT MAKING ANY CHANGES TO THE PLAYLIST
            case GlobalStoreActionType.CLOSE_DELETE_LIST_MODAL: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // DELETE THE LIST
            case GlobalStoreActionType.DELETE_THE_LIST: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false
                })
            }
            // PREPARE TO EDIT A SONG
            case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
                return setStore({
                    currentModal: payload.modalState,
                    idNamePairs: store.idNamePairs,
                    labeledSongToEdit: payload.songInfo,
                    labeledSongToEditIndex: payload.songIndex,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            //CLOSE THE EDIT SONG MODAL WITHOUT MAKING ANY CHANGES
            case GlobalStoreActionType.CLOSE_EDIT_SONG_MODAL: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // EDIT THE SONG
            case GlobalStoreActionType.EDIT_THE_SONG: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // PREPARE TO DELETE A SONG
            case GlobalStoreActionType.MARK_SONG_FOR_DELETING: {
                return setStore({
                    currentModal: payload.modalState,
                    idNamePairs: store.idNamePairs,
                    labeledSongToDelete: payload.songInfo,
                    labeledSongToDeleteIndex: payload.songIndex,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CLOSE THE DELETE SONG MODAL WITHOUT MAKING ANY CHANGES
            case GlobalStoreActionType.CLOSE_DELETE_SONG_MODAL: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // DELETE THE SONG
            case GlobalStoreActionType.DELETE_THE_SONG: {
                return setStore({
                    currentModal: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if(newName === "") newName = playlist.name; //to handle the payload rejection when we load a list in the first place 
                playlist.name = newName; //technically, the "payload" is created here
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    //THIS FUNCTION PROCESSES CREATING A NEW LIST
     store.createNewList = function() {
         let playlist = {
            name: "Untitled",
            songs: []
         }
         async function asyncCreateNewList() {
            let response = await api.addCreatePlaylist(playlist);
            if(response.data.success) { //now we need to set the edit state
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                });
                store.history.push("/playlist/" + newList._id);
            }
         }
         asyncCreateNewList();
    }

    //HANDLES MODAL OPENING AND WHAT NOT THEN WE DELETE THE LIST LATER ON (AFTERWARDS)
    //THEN WE NEED TO HANDLE FOR THE CONFIRM AND CANCEL BUTTONS
    store.markedListForDeletion = function(idNamePair) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: {
                modalState: CurrentModal.DELETE_LIST,
                specificList: idNamePair
            }
        });
    } 

    //USED TO CLOSE THE MODAL FOR DELETING A LIST
    store.closeDeleteListModal = function() {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_DELETE_LIST_MODAL,
            payload: CurrentModal.NONE
        });
    }

    //USED TO DELETE THE MARKED LIST 
    store.deleteMarkedList = function() {
        let playListToDelete = store.individualIdNamePair;
        let index = store.idNamePairs.indexOf(playListToDelete);
        store.idNamePairs.splice(index, 1);
        async function asyncDeleteList() {
            let response = await api.deletePlaylistById(playListToDelete._id)
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_THE_LIST,
                    payload: CurrentModal.NONE
                })
            }
        }
        asyncDeleteList();
    }
    
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    // THIS FUNCTION ALREADY DEALS INSIDE THE PLAYLIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        tps.clearAllTransactions();
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    //THIS FUNCTION IS FOR ADDING A SONG
    //WE ALREADY HAVE THE SONG ID CAUSE OF OUR URL
    //WHEN ADDING A SONG, WE ALSO GOTTA MAKE SURE THE SONG IS ADDED TO THE DATABASE
    store.addSong = function(index, song) { //we add a song to the end of a list
        let nowList = store.currentList;
        nowList.songs.splice(index, 0, song);
        async function updatePlaylist(nowList) {
            let response = await api.updatePlayListSongs(nowList._id, nowList);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.ADD_SONG_TO_CURRENT_LIST,
                    payload: {}
                });
            }
        }
        updatePlaylist(nowList);
    }

    store.addNewSong = function() {
        let index = store.currentList.songs.length;
        this.addSongTransaction(index, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }

    store.addSongTransaction = function(index, title, artist, youTubeId) {
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        }
        let transaction = new AddSong_Transaction(this, index, song);
        tps.addTransaction(transaction);
    }

    //THIS FUNCTION IS FOR MOVING A SONG
    store.moveSong = function(start, end) {
        let list = store.currentList;
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }
        async function updatePlaylist(list) {
            let response = await api.updatePlayListSongs(list._id, list);
            if(response.data.success) {
                console.log(response.data);
                storeReducer({
                    type: GlobalStoreActionType.MOVE_SONGS_IN_THE_LIST,
                    payload: {}
                })
            }
        }
        updatePlaylist(list);
    }

    store.addMoveSongTransaction = (start, end) => {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    //THIS FUNCTION IS FOR MARKING THE SONG WE WANT TO EDIT (WE DO A PUT REQUEST AFTERWARDS)
    store.markSongForEditing = function(index, song) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDITING,
            payload: {
                modalState: CurrentModal.EDIT_SONG,
                songIndex: index,
                songInfo: song
            }
        });
    }

    //THIS FUNCTION IS FOR CLOSING THE EDIT SONG MODAL
    store.closeEditSongModal = function() {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_EDIT_SONG_MODAL,
            payload: CurrentModal.NONE
        });
    }

    store.editLabeledSong = function(index, songData) { //ALL WE NEED TO DO IS CREATE AN ASYNC FUNCTION THAT WOULD FORCE A RERENDER OF THE SONGS IN THE LIST
        let song = store.currentList.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;
        let list = store.currentList;
        async function updatePlaylist(list) {
            let response = await api.updatePlayListSongs(list._id, list);
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.EDIT_THE_SONG,
                    payload: CurrentModal.NONE
                }) 
            }
        }
        updatePlaylist(list);
    }

    store.addEditSongTransaction = function(index, newSongData) {
        // GET THE CURRENT TEXT
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new EditSong_Transaction(store, index, oldSongData, newSongData);
        tps.addTransaction(transaction);
    }

    store.markSongForDeleting = function(index, song) { //THIS OPENS UP THE MODAL FOR DELETING SONG
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETING,
            payload: {
                modalState: CurrentModal.DELETE_SONG,
                songInfo: song,
                songIndex: index
            }
        });
    }

    store.closeDeleteSongModal = function() { //CLOSES MODAL FOR DELETING SONG (CANCEL BUTTON)
        storeReducer({
            type: GlobalStoreActionType.CLOSE_DELETE_SONG_MODAL,
            payload: CurrentModal.NONE
        });
    }

    store.deleteLabeledSong = function(songIndex) { //DELETES AND CLOSES MODAL (CONFIRM BUTTON)
        let nowList = store.currentList
        nowList.songs.splice(songIndex, 1);
        async function updatePlaylist(nowList) {
            let response = await api.updatePlayListSongs(nowList._id, nowList)
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_THE_SONG,
                    payload: CurrentModal.NONE
                })
            }
        }
        updatePlaylist(nowList);
    }

    store.addDeleteSongTransaction = function() {
        let index = store.labeledSongToDeleteIndex
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song); 
        tps.addTransaction(transaction);
    }
    
    store.isDeleteListModalOpen  = function() {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }

    store.isEditSongModalOpen = function() {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }

    store.isDeleteSongModalOpen = function() {
        return store.currentModal === CurrentModal.DELETE_SONG;
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }

    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.ableAddSong = function() {
        return store.currentList !== null;
    }

    store.ableUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.ableRedo = function() {
        return tps.hasTransactionToRedo();
    }

    store.ableClose = function() {
        return store.currentList !== null;
    }

    store.ableEdit = function() {
        return store.listNameActive;
    }

    store.handleAppKeyDown = function(keyEvent) {
        let CTRL_KEY_CODE = "17";
        if (keyEvent.which == CTRL_KEY_CODE) {
            this.ctrlPressed = true;
        }
        else if (keyEvent.key.toLowerCase() === "z") {
            if (this.ctrlPressed && (store.currentModal === undefined || store.currentModal === CurrentModal.NONE)) {
                tps.undoTransaction();
            }
        }
        else if (keyEvent.key.toLowerCase() === "y") {
            if (this.ctrlPressed && (store.currentModal === undefined || store.currentModal === CurrentModal.NONE)) {
                tps.doTransaction();
            }
        }
    }
    store.handleAppKeyUp = function(keyEvent) {
        if (keyEvent.which == "17")
            this.ctrlPressed = false;
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () { //WE DISABLE THE ADD LIST BUTTON HERE
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    
    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}
