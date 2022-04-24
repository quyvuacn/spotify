import React from "react";
import './PlayMusic.css'
export class PlayMusic extends React.Component{

    render() {
        return(
            <iframe
                src={`https://open.spotify.com/embed/track/${this.props.src}?utm_source=generator`}
                width="100%" height="380" frameBorder="0" allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
            </iframe>
        )
    }
}