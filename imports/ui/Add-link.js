import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { Form, Icon, Input, Button, Tooltip  } from 'antd';
import { link } from 'fs';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Card } from 'antd';
import './../styles/add-link.css'
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddLink extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const insertLinkSchema = new SimpleSchema({
            link: {
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }

        }, { check });
        this.props.form.validateFields((err, values, fileds) => {
            if (!err) {
                Link = values.Link;


                try {

                    insertLinkSchema.validate({ link: Link })
                }
                catch (e) {
                    this.setState({ error: 'Not Valid URL' })

                }
                Meteor.call("insertLink", Link, (error, result) => {
                    if (error) {
                        this.setState({ error: error.reason })
                    } else {
                        this.setState({ error: '' })

                    }

                    console.log("Fileds", fileds.Link)
                });
            }
        });
    }



    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;



        return (

            <Card title="Add New Link" bordered={true}   style={{backgroundColor:'#fafafa'}}>
                <Form layout="inline" onSubmit={this.handleSubmit}>


                    <FormItem

                        label={(
                            <span >
                                Your Link

                            </span>
                        )}
                       
                    >
                        {getFieldDecorator('Link', {
                            rules: [{ required: true, message: 'Please Enter your Link!',  whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <FormItem>
                        <Button
                            type="dashed"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Add
                        </Button>
                    </FormItem>
                </Form>
            </Card>

        );
    }

    
}
export default Form.create()(AddLink);