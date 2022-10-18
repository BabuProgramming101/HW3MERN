import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
import { useContext, useState } from 'react'
import { GlobalStoreContext } from './store'
import DeleteListModal from './components/DeleteListModal';
import EditSongModal from './components/EditSongModal';
import DeleteSongModal from './components/DeleteSongModal';


/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const { store } = useContext(GlobalStoreContext);

    document.onkeydown = store.handleAppKeyDown;
    document.onkeyup = store.handleAppKeyUp;

    let editSongModal;
    if(store.isEditSongModalOpen()) {
        editSongModal =
        <EditSongModal
                isOpenCallback= {store.isEditSongModalOpen}
                hideModalCallback = {store.closeEditSongModal}
                songToEdit = {store.labeledSongToEdit}
                songIndex = {store.labeledSongToEditIndex}
                updateSongCallback = {store.addEditSongTransaction}
        />
    }
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                {editSongModal}
                <Route path="/playlist/:id" exact component={PlaylistCards} /> 
            </Switch>
            <Statusbar />
            <DeleteListModal
                deleteMarkedListCallback = {store.deleteMarkedList}
                nameOfList = {store.individualIdNamePair}
                isOpenCallback = {store.isDeleteListModalOpen}
                hideModalCallback = {store.closeDeleteListModal}
            />
            <DeleteSongModal 
                hideModalCallback = {store.closeDeleteSongModal}
                deleteSongCallback = {store.addDeleteSongTransaction}
                songToRemove = {store.labeledSongToDelete}
                isOpenCallback = {store.isDeleteSongModalOpen}
            />

        </Router>
    )
}

export default App