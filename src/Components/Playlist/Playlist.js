import React from "react"
import './Playlist.css'
import {Track} from "../Track/Track";

export class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.eventChange = this.eventChange.bind(this)
    }

    eventChange(e){
        this.props.changeName(e.target.value)
    }

    render() {
        return(
            <div className="Playlist">
                <input defaultValue={this.props.playlistName} onChange={this.eventChange}/>
                <div className="TrackList">
                    {
                        this.props.searchResults.map(
                            e=>
                            <Track
                                track={e}
                                key={e.id}
                                isRemoval={true}
                                removeTrack={this.props.removeTrack}
                            />
                        )
                    }
                </div>

                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}