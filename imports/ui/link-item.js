import React, { Component } from 'react'
import ClipBoard from 'ClipBoard'
import { Card } from 'antd';
import './../styles/link.css'
export default class LinkItem extends Component {

    componentDidMount() {


        this.clipboard = new ClipBoard(this.refs.shortcut);

        this.clipboard.on('success', () => {
            this.refs.shortcut.innerHTML = "copied"
            setTimeout(() => {
                this.refs.shortcut.innerHTML = "copy"

            }, 1000);

        }).on('error', () => {
            alert("Faild")
        })
    }
    componentWillUnmount() {
        this.clipboard.destroy()
    }
    render() {


        const {
            Link,
            _id
        } = this.props
        return (


           <div>
                <Card  bordered={true} className="linkCard">
                    <h5>{Link}</h5>
                    <p>{Meteor.absoluteUrl(_id)}</p>
                    <button data-clipboard-text={Meteor.absoluteUrl(_id)} className="button4" ref="shortcut" >Copy</button>
                </Card>
                <br/>
          </div>

            
        )
    }
}
