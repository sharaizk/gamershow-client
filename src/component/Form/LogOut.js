import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {psignOut} from '../../actions'
import Modal from '../Modal'
import history from '../../history'
const LogOut =(props)=>{
    const renderContent = ()=>{
        return "Log out will result in minimal access to the site"
    }
    const renderActions=()=>{
        return(
            <React.Fragment>
            <NavLink to="/home">
            <div className="ui red  cancel inverted button">
              <i className="remove icon"></i>
              No
            </div>
            </NavLink>
            <button 
            style={{border: 'none', background:'none', outline:'none', width:'auto'}}
            onClick={()=>props.psignOut()}
            >
            <div className="ui green ok inverted button">
              <i className="checkmark icon"></i>
              Yes
            </div>
            </button>
          </React.Fragment>
        )
    }
    return (
        <div>
            <Modal
            title="Are you sure you want to Log Out?"
            content={renderContent()}
            icon="user times icon"
            actions={renderActions()}
            onDismiss={()=>history.push('/home')}
            />
        </div>
    )
}

export default connect(null, {psignOut})(LogOut)