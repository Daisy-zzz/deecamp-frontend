import React from 'react';
import { Button, Drawer } from 'antd';
import logo from './logo.svg';
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            欢迎来到手术室调度系统
          </p>
          <Button type="primary" size="large" onClick={this.showDrawer}>构建</Button>
          <Drawer
            title="配置信息"
            placement="right"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <MyForm />
          </Drawer>
        </header>
      </div>
    );
  }
}

export default App;
