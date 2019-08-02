import { Jia, Chart } from './Jia';
import React from 'react';
import EditableTable from './Csv2Table';
import { Tabs } from 'antd';
import logo from './logo.svg';
import './Yin.css';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Yin extends React.Component {
    render() {
        return (
            <div>
                
                <img src={logo} className='Yinlogo' />
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="患者总览" key="1">
                        <div id={"editableTable"}>
                            <EditableTable pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
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