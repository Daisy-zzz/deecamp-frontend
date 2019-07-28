import { Form, Input, Upload, message, Button, Icon } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import API from "./utils/api";
import Headers from "./utils/headers";


class Myform extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                fetch(API + '/hospital', Headers(values)).then(res => res.json()).then(function (res){
                    console.log(res);
                    window.location.href = 'http://localhost:3000/schedule';
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
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
            <Form labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="床位数">
                    {getFieldDecorator('operRoom', {
                        rules: [{ required: true, message: '请输入床位数！' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="医生数">
                    {getFieldDecorator('doctor', {
                        rules: [{ required: true, message: '请输入医生数' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="复苏室">
                    {getFieldDecorator('recover', {
                        rules: [{ required: true, message: '请输入复苏室数目' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 22, offset: 5 }}>
                    {getFieldDecorator('file', {
                        rules: [{ required: true, message: '请上传csv文件' }],
                    })(<Upload {...props}>
                        <Button size="large"><Icon type="upload" />点击上传</Button>
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