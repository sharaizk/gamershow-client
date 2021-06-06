import React from 'react'
import {connect} from 'react-redux'
import {fetchStreams, sucSnack, chkToken} from '../../actions'
import Paper from '@material-ui/core/Paper';
import CircleLoader from "react-spinners/CircleLoader";
import { NavLink} from 'react-router-dom'

class StreamList extends React.Component {
    state={
        load: null
    }
    timer = () =>{

    }
    componentDidMount(){
        this.setState({load:true})
        this.props.fetchStreams()
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

    // if user is same then show buttons
    renderAdmin(stream){
        if(stream.userId === this.props.currentUserId){
            return (
                <div id="adminBtns">
                    <NavLink to={`/streams/edit/${stream._id}`} id="edit">Edit</NavLink>
                    <NavLink exact to={`/streams/delete/${stream._id}`} id="del">Delete</NavLink>
                </div>
            )
        }
    }

    renderList(){
        return this.props.stream.map(streams =>{
            return(
                <React.Fragment key={streams._id}>
                <Paper elevation={0} />
                <Paper
                className="paperList"
                >
                    <div style={{margin: '0px 25px'}}>
                        <div className="streamDesc">
                        <NavLink to={`/streams/${streams._id}`} id="streamTitle">
                        {streams.title}
                        </NavLink>
                        <br/>
                        {streams.description}
                        </div>
                        {this.renderAdmin(streams)}
                    </div>
                </Paper>
                <Paper elevation={3} />
                </React.Fragment>
            )
        })
    }
    render(){
        if(this.state.load){
            return(
                <div className="Loader">
                <CircleLoader color={"#66FCF1"} loading={this.state.load} size={50} />
                </div>
            )
        }
        else{
            return(
                <div className="renderList">
                    <h4 className="labelHead">STREAMS</h4>
                    {this.renderList()}
                </div>
                )
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        stream: Object.values(state.stream),
        currentUserId: state.pauth.userId,
        sucsnack: state.sucsnack
    }
}
export default connect(mapStateToProps, {fetchStreams,sucSnack,chkToken})(StreamList)