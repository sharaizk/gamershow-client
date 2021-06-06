import './form.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {psignIn} from '../../actions'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class LoginForm extends React.Component{
    
    state={
        gender: "Male",
        error: false
    }    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            error:false
        })
    };

    renderErrorBar(message){
        return(
            <>
               <Snackbar open={this.state.error}  onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="error">
                    {message}
                </Alert>
                </Snackbar>
            </>
        )
    }

    renderInput({input, label, meta,type}){
        return(
            <div className="labFieldDiv">
                <label className="formLabel">{label}</label>
                <br />
                <input className="formField" required placeholder={label} {...input} type={type}/>
            </div>
        )
    }
    onSubmit =(formValues)=>{
            this.props.psignIn(formValues)
    }
    render(){
        return(
            <div className="formDiv">
                <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <h3 className="formHeader">LogIn</h3>
                    <Field name="username" component ={this.renderInput} label="Username" type="text"/>

                    <Field name="password" component ={this.renderInput} label="Password" type="password"/>

                    <NavLink exact to="/register" className="linklogin">Don't have an account? Create One</NavLink>
                    <div className="submitsignForm">
                    <button  className="userubmit_btn">Login</button>
                    </div>
                    {this.renderErrorBar("Passwords Do not match")}
                </form>

            </div>
        )

    }
    

}


const login=reduxForm({
    form: 'loginForm',
})(LoginForm)

export default connect(null, {psignIn})(login)