import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';


const Main = props => {
    const {authUser, errors, removeError} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={props => <Homepage {...props} />} />
                <Route path='/signin' render={props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}  
                            {...props} 
                            buttonText='Log in'
                            heading='Welcome Back.' />
                    )
                }} />
                <Route exact path='/signup' render={props => {
                    return (
                        <AuthForm 
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser} 
                            {...props} 
                            buttonText='Sign up' 
                            heading='Join Warbler Today' 
                            signUp/>
                    )
                }} />
            </Switch>
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));