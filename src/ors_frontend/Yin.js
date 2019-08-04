import { Jia, Chart } from './Jia';
import React from 'react';
import EditableTable from './Csv2Table';
import { Tabs } from 'antd';
import logo from './logo.svg';
import './Yin.css';
import { Button, notification } from 'antd';
import API from './utils/api.js';
import Headers from './utils/headers.js';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Yin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1',
        };
    };


    handleClick = () => {
        // localStorage.setItem("predict", EditableTable.dataSource);
        // console.log(EditableTable.dataSource);
        this.setState({ activeKey: '2' });
        notification.open({
            message: '提交成功！',
            description:
                '患者信息已经成功上传，正在生成调度表。',
        });

        fetch(API + '/table', Headers(EditableTable.dataSource)).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(function (json) {
            console.log(json);
        });
    };

    change = (key) => {
        this.setState({ activeKey: key });
    }

    render() {
        return (
            <div>
                <div className='frontDIV'>
                    <img src={logo} className='Yinlogo' />
                </div>
                <Tabs activeKey={this.state.activeKey} onChange={this.change}>
                    <TabPane tab="患者总览" key="1">
                        <div id={"editableTable"} className='predictOutput'>
                            <EditableTable pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
                        </div>
                        <div>
                            <Button onClick={this.handleClick} type="primary" style={{ marginBottom: 16 }} className="submit"> 提交 </Button>
                        </div>
                    </TabPane>
                    <TabPane tab="手术室调度排班表" key="2">
                        <div>
                            <Jia />
                        </div>
                        <div className="chart">
                            <Chart />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default Yin;