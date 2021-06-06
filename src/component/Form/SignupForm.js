import './form.css'
import React from 'react'
import DropDown from './DropDown'
import {NavLink} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {signUp} from '../../actions'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class SignupForm extends React.Component{
    
    state={
        gender: "Male",
        error: false
    }    
    changeGender=(gender)=>{
        this.setState({gender:gender})
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
        if(formValues.password !== formValues.cpassword){
            return this.setState({error:true})
        }
        else{
            this.props.signUp(formValues,this.state.gender)
        }

    }
    render(){
        return(
            <div className="formDiv">
                <form className="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <h3 className="formHeader">Sign Up</h3>
                    <Field name="name" component ={this.renderInput} label="Full Name" type="text"/>

                    <Field name="username" component ={this.renderInput} label="Username" type="text"/>

                    <Field name="email" component={this.renderInput} label="Email" type="email"/>

                    <Field name="password" component ={this.renderInput} label="Password" type="password"/>

                    <Field name="cpassword" component ={this.renderInput} label="Confirm Password" type="password"/>
                    <DropDown changeGender={this.changeGender}/>
                    <NavLink exact to="/login" className="linklogin">Already a Member? Log In instead</NavLink>
                    <div className="submitsignForm">
                    <button  className="userubmit_btn">Submit</button>
                    </div>
                    {this.renderErrorBar("Passwords Do not match")}
                </form>

            </div>
        )

    }
    

}

const login=reduxForm({
    form: 'signupForm',
})(SignupForm)

export default connect(null, {signUp})(login)