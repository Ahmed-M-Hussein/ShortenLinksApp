import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

import shortid from 'shortid'
export const Links = new Mongo.Collection("links");

if (Meteor.isServer) {

    Meteor.publish('Links', function () {


        return Links.find({ userId: this.userId });
    })
}

const insertLinkSchema = new SimpleSchema({
    link: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
    }

}, { check });
Meteor.methods({


    insertLink(Link) {

        if (!(Link)) {
            throw new Meteor.Error("invalid", "You Cant insert Empty URL")
        }


        try {

            insertLinkSchema.validate({ link: Link })
        }
        catch (e) {
            throw new Meteor.Error("invalid", "You Must enter valid URL")

        }

        Links.insert({
            
            Link,
            userId:this.userId,
            _id: shortid.generate()
        })

    },

    getLinks() {

        if (!Meteor.users.find({ _id: this.userId })) {

            throw new Meteor.Error("UnAuthrizedUSer", "You should login frist")
        }
        return Links.find({ userId: this.userId }).fetch();
    }
})