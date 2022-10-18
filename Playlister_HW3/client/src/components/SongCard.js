import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }
    function handleDragOver(event) {
        event.preventDefault();
    }
    function handleDragEnter(event) {
        event.preventDefault();
    }
    function handleDragLeave(event) {
        event.preventDefault();
    }
    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index
        let sourceIndex = Number(event.dataTransfer.getData("song"));

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }

    function handleClick (event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.markSongForEditing(index, song);
        }
    }

    function handleDeleteSong (event) {
        event.preventDefault();
        store.markSongForDeleting(index, song);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1 + ')'}
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleDeleteSong}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;