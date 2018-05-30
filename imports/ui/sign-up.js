import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router-dom'
import './../styles/signup.css'
import { Form, Input, Tooltip, Icon, Select, Col, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class SignUp extends Component {

    state = {

    };
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            confirmDirty: false,
            autoCompleteResult: [],
        }
    }
    handelSubmit2 = (e) => {
        e.preventDefault();


        username = this.refs.username.value.trim();
        password = this.refs.password.value.trim();
        cPassword = this.refs.cPassword.value.trim();
        email = this.refs.email.value.trim();

        if (password === cPassword) {
            Accounts.createUser({ username, email, password }, (error) => {
                this.setState({ error: error.reason || '' });
            });

            this.refs.username.value = '';
            this.refs.password.value = '';
            this.refs.cPassword.value = '';
            this.refs.email.value = '';
        } else {
            alert("Not valid password not match")

        }


    }

    //
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Accounts.createUser({ username:values.username, email:values.email, password:values.password }, (error) => {
                    this.setState({ error: error.reason || '' });
                });
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    //

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        

        return (

            <div className="signupContainer">

            
            <Form onSubmit={this.handleSubmit} >
            <h1>Register Now</h1>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            username&nbsp;
                  <Tooltip title="username">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your Username!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Password">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Confirm Password">
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>








                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
<br/>
                    <Link to="login"> <a href="#">Already have Account</a></Link>
                </FormItem>


            </Form>
            </div>
        );
    }

    // render() {



    //     return (
    //         <div>

    //             <h1>Join Short App </h1>
    //             {this.state.error ? <p>{this.state.error}</p> : undefined}
    //             <form onSubmit={this.handelSubmit} >

    //                 <input type="text" placeholder="username" ref="username" /> <br />
    //                 <input type="email" placeholder="Email" ref="email" /><br />
    //                 <input type="password" placeholder="password" ref="password" /><br />
    //                 <input type="password" placeholder="Confirm Password" ref="cPassword" /><br />
    //                 <button >save</button>

    //                 <Link to="login"> <h4>Already have Account</h4></Link>
    //             </form>

    //         </div>
    //     )
    // }
}
export default Form.create()(SignUp);