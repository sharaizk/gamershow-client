import React  from 'react'
import Button from "@material-ui/core/Button";

import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{ 

    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '946483357011-82k5gpb45tqs5b76d8k6n9ctnmdsvo7b.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()
                
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    onAuthChange = (isSignedIn) => isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()): this.props.signOut()


    // TO SIGN IN
    onSignInClick = () =>{
        this.auth.signIn()
    }

    // TO SIGN OUT
    onSignOutClick = () =>{
        this.auth.signOut()
    }

   renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
            
        }
        else if(this.props.isSignedIn){
            return <Button onClick={this.onSignOutClick} className="ggl-btn" color="inherit"><i className="google icon icn"></i> Log Out</Button>
        }
        else{
            return <Button onClick={this.onSignInClick} className="ggl-btn" color="inherit"><i className="google icon icn"></i> Login</Button>
        }
    }
        render(){
            return (
                <div style={{display: 'grid', placeItems:'center'}}>
                    {this.renderAuthButton()}
                </div>
            )
        }
}

const mapStateToProps = (state) =>{
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(
    mapStateToProps, 
    {signIn, signOut})
    (GoogleAuth)