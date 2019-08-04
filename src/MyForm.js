import {Form, Upload, message, Button, Icon, TimePicker, InputNumber} from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import API from "./utils/api";
import Headers from "./utils/headers";
import moment from 'moment';

const format = 'HH:mm';

class Myform extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                fetch(API + '/hospital', Headers(values)).then(res => {
                if (res.status === 200) {
                        return res.json()
                }
                }).then(function (json){
                    console.log(json);
                    window.location.href = 'http://localhost:3000/schedule';
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            action: API + '/hospital',
            headers: {
                authorization: 'authorization-text',
            },
            accept: ".csv",
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
            },
        };
        return (
            <Form  onSubmit={this.handleSubmit}>
                <Form.Item labelCol={{ span: 10}} wrapperCol={{ span:10, offset: -1 }} label="上班时间">
                    {getFieldDecorator('start_time', {
                        rules: [{ required: true, message: '请输入上班时间！' }],
                    })(<TimePicker initialValue={moment('8:00', format)} format={format} />)}
                </Form.Item>

                <Form.Item labelCol={{ span: 10}} wrapperCol={{ span:10, offset: -1 }} label="下班时间">
                    {getFieldDecorator('end_time', {
                        rules: [{ required: true, message: '请输入下班时间！' }],
                    })(<TimePicker initialValue={moment('4:00', format)} format={format} />)}
                </Form.Item>

                <Form.Item labelCol={{ span: 12}} wrapperCol={{ span:10, offset: -1 }} label="手术室数量">
                    {getFieldDecorator('operRoom', {
                        rules: [{ required: true, message: '请输入手术室数量' }],
                    })(<InputNumber min={1} precision={0.1} />)}
                </Form.Item>

                <Form.Item labelCol={{ span: 12}} wrapperCol={{ span:10, offset: -1 }} label="复苏室数量">
                    {getFieldDecorator('recover', {
                        rules: [{ required: true, message: '请输入复苏室数量' }],
                    })(<InputNumber min={1} precision={0.1} />)}
                </Form.Item>

                <Form.Item labelCol={{ span: 12}} wrapperCol={{ span:10, offset: -1 }} label="最小复苏时间">
                    {getFieldDecorator('doctor', {
                        rules: [{ required: true, message: '请输入复苏时间' }],
                    })(<InputNumber min={1} precision={0.1} />)}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 22, offset: 5 }}>
                    {getFieldDecorator('file', {
                        rules: [{ required: true, message: '请上传csv文件' }],
                    })(<Upload {...props}>
                        <Button size="large"><Icon type="upload" />上传多人病例表</Button>
                       </Upload>)}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 22, offset: 10 }}>
                    <Button type="primary" size="large" htmlType="submit">完成</Button>
                </Form.Item>

            </Form>
        );
    }
}

const MyForm = Form.create({ name: 'dynamic_rule' })(Myform);

export default MyForm;