import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import EditToolbar from "./EditToolbar";
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    let addList = "list-selector-button"
    if(store.ableEdit()) addList += "disabled";
    
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="playlist-selector">
            <span class="playlist-selector-logo"> Your Lists <input
                    type="button"
                    id="add-list-button"
                    disabled = {store.ableEdit()}
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" /> </span>
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
            </div> {
                    listCard
                }
            </div>
        </div>)
}

export default ListSelector;