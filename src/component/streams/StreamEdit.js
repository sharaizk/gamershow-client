import React from 'react'
import {connect} from 'react-redux'
import {fetchStream, editStream,sucSnack,chkToken} from '../../actions'
import StreamForm from './StreamForm'
import _ from 'lodash'

// SNACKBAR
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import history from '../../history'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.chkToken()
        this.props.fetchStream(this.props.match.params.id)
    }
    handleClose = async(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open:false
        })
        await this.props.sucSnack(false)
        history.push('/home')
    };

    onSubmit=(formValues)=>{
        this.props.editStream(this.props.match.params.id, formValues)
        this.props.sucSnack(true)
    }


    render(){
        return(
            <div className="createStream">
                <div className="createForm">
                <h4 id="createLabel">Edit Stream</h4>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title','description')}/>
                <Snackbar open={this.props.sucsnack}  onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Stream edited succesfully
                    </Alert>
                </Snackbar>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        stream: state.stream[ownProps.match.params.id],
        sucsnack: state.sucsnack
    }
}

export default  connect(mapStateToProps, {fetchStream, editStream, sucSnack,chkToken})(StreamEdit)