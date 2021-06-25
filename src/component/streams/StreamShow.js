import React from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
import {chkToken} from '../../actions'
import flv from 'flv.js'

class StreamShow extends React.Component{

    constructor(props){
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
        this.buildPlayer()
        this.props.chkToken()
    }

    componentDidUpdate(){
        this.buildPlayer()
    }

    componentWillUnmount(){
        this.player.destroy()
    }
    buildPlayer(){
        if (this.player || !this.props.stream){
            return
        }

        else{
            this.player=flv.createPlayer({
                type:'flv',
                url: `https://971401932550.ngrok.io/live/${this.props.match.params.id}.flv`
            })
            this.player.attachMediaElement(this.videoRef.current)
            this.player.load()
        }
    }
    renderInstruction(stream){
        if(stream.userId === this.props.currentUserId){
            return (
                <>
                    <ol className="instructions">How to Setup the Stream:
                        <li>Open you Brodacasting Software (i.e: OBS/StreamLabs Obs)</li>
                        <li>Go to settings</li>
                        <li>Type in the link: rtmp://localhost/live</li>
                        <li>Use the Server Key: {this.props.match.params.id}</li>
                        <li>Apply and start the Stream</li>
                    </ol>   
                </>
            )
        }
    }
    render(){
        if(!this.props.stream){
            return <div>Loading</div>
        }

        const {title,description} = this.props.stream

        return(
        
            <div className="ui container cont">
                <video ref={this.videoRef} controls className="videoPlayer"/>
                <h1 className="streamHeader">{title}</h1>
                <h3 className="streaDesc">{description}</h3> 
                {this.renderInstruction(this.props.stream)} 
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return{
        stream: state.stream[ownProps.match.params.id],
        currentUserId: state.pauth.userId,
    }
}

export default connect(mapStateToProps, {fetchStream,chkToken})(StreamShow)