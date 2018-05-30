import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
const Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
        author: {
        type: String,
        label: "Author"
    },
}));
if (Meteor.isServer) {
    Meteor.publish('allBooks', function () {
        return Books.find({}, );
    });
};
export default Books;