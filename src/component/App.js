import React from 'react'
import './App.css'
import { Router, Route, Switch} from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import StreamHome from './streams/StreamHome'
import SignupForm from './Form/SignupForm'
import LoginForm from './Form/LoginForm'
import history from '../history'
import LandHome from './LandHome'

import Header from './Header'
import LogOut from './Form/LogOut'

const App = () =>{
    return (
        <div>
            <Router history={history}>
            <div>
            <Header />
            <Switch>
            <Route path="/" exact component={LandHome}/>
            <Route path="/home" exact component={StreamHome}/>
            <Route path="/streams/list" component={StreamList} />
            <Route path="/streams/new" component={StreamCreate}/>
            <Route path="/streams/edit/:id" component={StreamEdit}/>
            <Route path="/streams/delete/:id" component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow}/>
            <Route path="/register" exact component={SignupForm} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/logout" exact component={LogOut} />
            </Switch>
            </div>
            </Router>
        </div>
    )
}

export default App