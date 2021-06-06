import React from 'react'
import {connect} from 'react-redux'
import {chkToken} from '../../actions'
import {NavLink} from 'react-router-dom'
import CircleLoader from "react-spinners/CircleLoader";
import BG from "../../assets/BG.mp4"

class StreamHome extends React.Component {
    state={
        load: null
    }
    componentDidMount(){
        this.setState({load:true})
        this.timer=setTimeout(()=>{
            this.setState({load:false})
        },1500)
        this.props.chkToken()
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    componentDidUpdate(){
        if(this.props.sucsnack){
            this.props.sucSnack(false)
        }
    }
    renderHome(){
        return(
            <div>
                <h4>HomePAge</h4>
            </div>
        )
    }

    render(){
        if(this.state.load){
            return(
                <div className="Loader">
                <CircleLoader color={"#66FCF1"} loading={this.state.load} size={50} />
                </div>
            )
        }
        return (
            <>
          <div className="landHome">
            <video
              autoPlay
              loop
              muted
              disablePictureInPicture
              controlsList="nodownload"
              className="video"
            >
              <source src={BG} type="video/mp4" />
            </video>
            <div className="text">
              <h2>Never Stop</h2>
              <h3>Exploring the Virtual World</h3>
              <p>Join the GamerShow community!<br />Discover the best live streams anywhere.</p>
              <NavLink id='toStreamBtn' exact to="/streams/list">WATCH STREAMS</NavLink>
            </div>
          </div>
          </>
        );
    }
}

export default connect(null, {chkToken})(StreamHome)
