import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import './../styles/login.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    handelSubmit2 = (e) => {
        e.preventDefault();


        email = this.refs.email.value;
        password = this.refs.password.value;
        Meteor.loginWithPassword({ email }, password, (error) => {
            this.setState({ error: error.reason || '' });

        })
        this.refs.email.value = "";
        this.refs.password.value = "";

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {



                Meteor.loginWithPassword({ email: values.email }, values.password, (error) => {
                    this.setState({ error: error.reason || '' });

                })
            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <div className="LoginContainer">
                <h1>Login </h1>
                <div id="components-form-demo-normal-login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ type: 'email', required: true, message: 'Please input your Email!' }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                        <FormItem>


                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/"> <a href="">register now!</a></Link>
                        </FormItem>
                        {this.state.error ? <p className="loginError">{this.state.error}</p> : undefined}
                    </Form>

                </div>
            </div>
        );
    }


    

}
export default Form.create()(Login)