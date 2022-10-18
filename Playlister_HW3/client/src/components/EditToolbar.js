import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let addSongClass = "toolbar-button-";
    let undoClass = "toolbar-button-";
    let redoClass = "toolbar-button-";
    let closeClass = "toolbar-button-";
    if (!store.ableAddSong()) addSongClass += "disabled";
    if (!store.ableUndo()) undoClass += "disabled";
    if (!store.ableRedo()) redoClass += "disabled";
    if (!store.ableClose()) closeClass += "disabled"; 

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong() {
        store.addNewSong();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!store.ableAddSong() || store.isEditSongModalOpen() || store.isDeleteSongModalOpen() || store.isDeleteListModalOpen()}
                value="+"
                className={addSongClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!store.ableUndo() || store.isEditSongModalOpen() || store.isDeleteSongModalOpen() || store.isDeleteListModalOpen()}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!store.ableRedo() || store.isEditSongModalOpen() || store.isDeleteSongModalOpen() || store.isDeleteListModalOpen()}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!store.ableClose() || store.isEditSongModalOpen() || store.isDeleteSongModalOpen() || store.isDeleteListModalOpen()}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;