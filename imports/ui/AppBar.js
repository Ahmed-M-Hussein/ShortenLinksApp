import React, { Component } from 'react'
import './../styles/app-bar.css'
import { Button } from 'antd';

import { Meteor } from 'meteor/meteor'

export default class AppBar extends Component {


    state = {
        username:''
    }
    handelLogout = () => {


        Accounts.logout();
    }


    componentWillReceiveProps(nextprops){

        const user = this.props.user || nextProps.user;

        if (user){
            this.setState({username:user.username})

            console.log(user)
        }

    }
    render() {


        console.log(Meteor.userId())
        return (

            <div className="bar">
                Short LINK Application

                {/* <Button className="lgout" > {this.state.username}</Button> */}
                <Button  className="logout" type="dashed" onClick={this.handelLogout}>LogOut</Button><br />
            </div>



        )
    }
}
