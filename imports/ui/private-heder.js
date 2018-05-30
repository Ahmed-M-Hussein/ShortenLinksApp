import React, { Component } from 'react'

export default class PrivateHeader extends Component {
    handelLogout = () => {


        Accounts.logout();
    }

    render() {

        const {
            title
        } = this.props
        return (
            <div>
                <h1>{title}</h1>
                <button onClick={this.handelLogout}>LogOut</button><br />
            </div>
        )
    }
}
