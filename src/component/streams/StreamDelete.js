import React from "react";
import Modal from "../Modal";
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchStream, deleteStream,chkToken} from '../../actions'
import history from '../../history'

class StreamDelete extends React.Component {
    componentDidMount(){
        this.props.chkToken()
        this.props.fetchStream(this.props.match.params.id)
    }

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?"
        }
        return `Are you sure you want to delete this stream: ${this.props.stream.title}?`
    }
  renderActions(){
      const {id} = this.props.match.params
    return(
        <React.Fragment>
        <NavLink to="/">
        <div className="ui red  cancel inverted button">
          <i className="remove icon"></i>
          No
        </div>
        </NavLink>
        <button 
        style={{border: 'none', background:'none', outline:'none', width:'auto'}}
        onClick={()=>this.props.deleteStream(id)}
        >
        <div className="ui green ok inverted button">
          <i className="checkmark icon"></i>
          Yes
        </div>
        </button>
      </React.Fragment>
    )
  }
  render(){
  return (
            
        <Modal
        title="Are you sure, you want to delete?"
        content={this.renderContent()}
        icon="trash icon"
        actions={this.renderActions()}
        onDismiss={()=>history.push('/home')}
      />
  );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return{
        stream: state.stream[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchStream, deleteStream,chkToken})(StreamDelete);
