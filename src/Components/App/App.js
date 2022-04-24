import React from "react";


import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";
import {PlayMusic} from "../PlayMusic/PlayMusic";
import Spotify from "../util/Spotify";

import './App.css'

export class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchResults :
                [],
            playList:
                [],
            playlistName: "New Playlist",
            srcPresent:"17iGUekw5nFt5mIRJcUm3R"
        }

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.changeName = this.changeName.bind(this)
        this.savePlayList = this.savePlayList.bind(this)
        this.search = this.search.bind(this)
        this.changeSrcPresent = this.changeSrcPresent.bind(this)
    }

    componentDidMount() {
        Spotify.getAccessToken()
    }

    addTrack(track){
        let tracks = this.state.playList
        if(!this.state.playList.find(e=>e.id===track.id)){
            tracks.push(track)
            this.setState({
                playList:tracks
            })
        }
    }

    removeTrack(track){
        let tracks = this.state.playList.filter(
            e => e.id !== track.id
        )
        this.setState({
            playList:tracks
        })
    }

    changeName(value){
        this.setState({
            playlistName: value
        })
    }

    // spotify:track:3IAfUEeaXRX9s9UdKOJrFI
    savePlayList(){
        const trackURIs = this.state.playList.map(track=>track.uri)
        Spotify.savePlayList(this.state.playlistName,trackURIs).then(()=>{
            this.setState({
                playlistName:"New Playlist",
                playList : []
            })
        })
    }

    search(term){
      Spotify.search(term).then(
          searchResults =>{
              this.setState({
                  searchResults:searchResults
              })
          }
      )
    }

    changeSrcPresent(keyTrack){
        this.setState({
            srcPresent: keyTrack
        })
    }

    render() {
        return(
                <div>
                    <h1>Ja<span className="highlight">mmm</span>ing</h1>
                    <div className="App">
                        <SearchBar onSearch={this.search}/>
                        <PlayMusic src={this.state.srcPresent}/>
                        <div className="App-playlist">
                            <SearchResults searchResults={this.state.searchResults} addTrack={this.addTrack} onchangeSrc={this.changeSrcPresent}/>
                            <Playlist
                                searchResults={this.state.playList}
                                removeTrack={this.removeTrack}
                                playlistName={this.state.playlistName}
                                changeName = {this.changeName}
                                onSave = {this.savePlayList}
                            />
                        </div>
                    </div>
                </div>
        )
    }
}
