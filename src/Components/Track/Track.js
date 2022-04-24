import React from "react"
import './Track.css'

export class Track extends React.Component{

    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={()=>{this.props.removeTrack(this.props.track)}}>-</button>
        }else{
            return <button className="Track-action" onClick={()=>{this.props.addTrack(this.props.track)}}>+</button>
        }
    }



    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}</p>
                </div>
                {this.renderAction()}

            </div>
        )
    }
}