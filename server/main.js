import { Meteor } from 'meteor/meteor';
import { Links } from './../imports/api/collections/links'
import { WebApp } from 'meteor/webapp'
import './../imports/api/node-http'
Meteor.startup(() => {
  // code to run on server at startup




  WebApp.connectHandlers.use((request, response, next) => {


    const _id = request.url.slice(1);
    let link = Links.findOne({ _id })

    if (link) {
      response.statusCode = 302;
      response.setHeader("Location", link.Link);
      response.end();
    } else {
      next();
    }


  })

});
