import React from 'react'
import {Field, reduxForm} from 'redux-form'

class StreamForm extends React.Component{
    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="error-message">
                    {error}
                </div>
            )
        }
    }
    renderInput=({input, label, meta})=>{

        return (
            <>
                <label className="fieldLabel">{label}</label>
                <br />
                <input autoComplete="off" className="text-field" placeholder={label} {...input}/>
                {this.renderError(meta)}
            </>
        )
    }

    onSubmit =(formValues)=>{
        this.props.onSubmit(formValues)
    }
    
    render(){
            return(
            <>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <div className="field">
                <Field  name="title" component ={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button  className="submit_btn">Submit</button>
                </div >
            </form>
            </>
    )
    }
}

const validate = (formValues) =>{
    const errors={}

    if(!formValues.title){
        errors.title='You must enter a title'
    }
    if(!formValues.description){
        errors.description="You must enter a Description"
    }
    return errors
}



export default reduxForm({
    form: 'streamForm',
    validate,
})(StreamForm)