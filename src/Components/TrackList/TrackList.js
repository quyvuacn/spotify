import React from "react"
import './TrackList.css'
import {Track} from "../Track/Track";

export class TrackList extends React.Component{


    render() {
        return(
            <div className="TrackList">
                {
                    this.props.track.map(
                        e => <Track track={e} key={e.id} addTrack={this.props.addTrack} isRemoval={false} onchangeSrc={this.props.onchangeSrc}/>
                    )
                }
            </div>
        )
    }
}