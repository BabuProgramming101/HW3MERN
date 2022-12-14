import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import EditToolbar from "./EditToolbar";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    

    return (
        <div id="playlist-cards" >
        <span class = "playlist-items-display">Playlist Songs <EditToolbar></EditToolbar></span>
        <div id ="playlist-cards-heading">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
                
            ))
            
        }
        </div>
        </div>
    )
}

export default PlaylistCards;