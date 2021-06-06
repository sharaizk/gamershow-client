import React from 'react'
import {connect} from 'react-redux'
import {createStream, sucSnack,chkToken} from '../../actions'
import StreamForm from './StreamForm'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircleLoader from "react-spinners/CircleLoader";
import history from '../../history'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class StreamCreate extends React.Component{
    state={
        open:false,
        load: null
    }
    componentDidMount(){
        this.setState({load:true})
        setTimeout(()=>{
            this.setState({load:false})
        },2500)
        this.props.chkToken()
    }


    // FOR SNACKBARS
    handleClose = async(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open:false
        })
        await this.props.sucSnack(false)
        history.push('/')
    };


    onSubmit =(formValues)=>{
        this.props.createStream(formValues)
        this.props.sucSnack(true)
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
        <div className="createStream">
            <div className="createForm">
            <h4 id="createLabel">Create Stream</h4>
            <StreamForm onSubmit={this.onSubmit}/>
            <Snackbar open={this.props.sucsnack}  onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                    Stream Created
                </Alert>
            </Snackbar>
        </div>
        </div>
    )
    }
    }
}

const mapStateToProps=(state)=>{
    return{
        sucsnack: state.sucsnack
    }
}

export default connect(mapStateToProps, {createStream, sucSnack,chkToken})(StreamCreate)