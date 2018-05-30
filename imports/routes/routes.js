import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Tracker } from 'meteor/tracker'
import history from './history'

import Login from './../ui/login'
import SignUp from './../ui/sign-up'
import Links from './../ui/links'
import NotFound from './../ui/NotFound'


const routes = (


    <Router history={history} >
        <Switch>
            <Route exact path="/" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/links" component={Links} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>



);

export default routes;

export const OnAuth = (isAuthentcated) => {

    const NologinPages = ["/", "/login"]
    const NeedloginPages = ["/links"]

    pathname = history.location.pathname;
    isNeedLogin = NeedloginPages.includes(pathname);
    isNoNdeed = NologinPages.includes(pathname);

    if (!isAuthentcated && isNeedLogin) {
        history.replace('/login')
    }
    if (isAuthentcated && isNoNdeed) {
        history.replace("/links")
    }
}



