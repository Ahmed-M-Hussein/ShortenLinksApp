import React, { Component } from 'react'
import ViewLinks from './../ui/view-links'
import AppBar from './../ui/AppBar'
import AddLink from './../ui/Add-link'
import './../styles/links.css'
export default class Links extends Component {



    render() {
        return (

            <div style={{ backgroundColor: '##e8e8e8' }} >
                <AppBar title="Short App" />
                <div className="linksContainerGrid">

                    <div> </div>
                    <div >

                        <br />
                        <AddLink />
                        <ViewLinks />

                    </div>
                    <div></div>
                </div>
            </div>
        )
    }
}
