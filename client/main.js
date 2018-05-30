import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDom from 'react-dom'
import routes, { OnAuth } from './../imports/routes/routes'
import Login from './../imports/ui/login'


Tracker.autorun(() => {

  isAuthentcated = !!Meteor.userId()
  OnAuth(isAuthentcated);

});
Meteor.startup(() => {


  ReactDom.render(<div >{routes} </div>, document.getElementById('App'));


});