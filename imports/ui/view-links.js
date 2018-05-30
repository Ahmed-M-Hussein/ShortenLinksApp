import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'
import { Links } from './../api/collections/links'
import { Meteor } from 'meteor/meteor'
import LinkItem from './../ui/link-item'


export default class ViewLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [],
            links2: [],

        }
    }
    componentWillMount() {


        //Method Call
        // Meteor.call("getLinks", (error, result) => {

        //     this.setState({ links2: result })


        // })
        this.Ctracker = Tracker.autorun(() => {
            //publication Call
            if (Meteor.isClient) {
                Meteor.subscribe('Links')

                let links = Links.find().fetch();
                this.setState({ links });

            }
        })

    }

    componentWillUnmount() {
        // Ctracker
        this.Ctracker.stop();
    }


    renderCustomers = () => {
        return this.state.links.map((element, index) => {
            return <LinkItem key={element._id} {...element} />
        })
    }


    renderMethodLinks = () => {

        return this.state.links2.map((item => {
            return <LinkItem key={item._id} {...item} />
        }))

    }
    
    render() {


        return (
            <div>
                <br/>
                {this.renderCustomers()}
                {/* <p>Customers From Methods</p>
                {this.renderMethodLinks()} */}
            </div>
        )
    }
}
