import React from "react"
import './SearchResults.css'
import {TrackList} from "../TrackList/TrackList";
export class SearchResults extends React.Component{

    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList track={this.props.searchResults} addTrack={this.props.addTrack} onchangeSrc={this.props.onchangeSrc}/>
            </div>
        )
    }
}