import React from 'react';
import {Button, Drawer, Icon, message, Upload} from 'antd';
import logo from './logo.svg';
import background from './img/back.jpg'
import pic from './img/timg.gif'
import './App.css';
import 'antd/dist/antd.css';
import MyForm from './MyForm';
class App extends React.Component{

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render(){
        const props = {
            name: 'file',
            action: 'http://127.0.0.1:5000/hospital',
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
      <div className="App" style={{backgroundImage:`url(${background})`}}>
          <div className="page">
            <div className="head">
              <img src={logo} className="App-logo" alt="logo" />
              <p className="text1">
                d o c t  O R S
              </p>
            </div>
            <div className="head">
                <p className="text2">
                  d o c t
                <br />
                  O R S
                </p>
                <p className="text3">
                  减 轻 您 手 术 室 排 班
                <br />
                  负 担 的 起 点
                </p>
            </div>
            <p className="text4">
              AI智能&emsp;&emsp;&emsp;&emsp;人性化可调节&emsp;&emsp;&emsp;&emsp;极速计算生成&emsp;&emsp;&emsp;&emsp;优化使用效率
            </p>
            <div className="head">
              <Upload {...props}>
                <Button className="button1" type="primary">
                  <Icon type="upload" /> 上传历史患者信息表
                </Button>
              </Upload>
              <Button className="button2" type="primary" onClick={this.showDrawer}>构建调度表</Button>
            </div>
            <p className="bottom_text">专 注 于 医 疗 人 工 智 能 产 品 开 发</p>
            <Drawer
              title="配置信息"
              placement="right"
              closable={true}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <MyForm />
            </Drawer>
        </div>
        <div className="App-back2">
            <div className="page">
                <div className="head">
                    <p className="page2_text1">
                        使 用 预 测 算 法 实 现 准 确 排 班
                    </p>
                    <img src={pic} className="pic" alt="pic" />
                </div>

                <div className="head">
                    <img src={pic} className="pic" alt="pic" />
                    <p className="page2_text1">
                        手 术 室 利 用 率 显 著 提 高
                    </p>
                </div>

                <div className="head">
                    <p className="page2_text1">
                        自 适 应 预 测 利 用 您 的 历 史 数 据
                    </p>
                    <img src={pic} className="pic" alt="pic" />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
