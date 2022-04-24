import React from "react"
import './Track.css'
export class Track extends React.Component{

    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={()=>{this.props.removeTrack(this.props.track)}}>-</button>
        }else{
            return(
                <div className="Track-btn">
                    <button className="Track-action" onClick={()=>{this.props.addTrack(this.props.track)}}>+</button>
                    <button className="Track-play" onClick={()=>{this.props.onchangeSrc(this.props.track.id)}}>
                        <img src={require('./btn-play.png')}/>
                    </button>
                </div>
            )
        }
    }



    render() {
        return(
            <div className="Track">
                <div className="Track-information" >
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}</p>

                </div>

                {this.renderAction()}

            </div>
        )
    }
}