import React, { Component } from 'react';
import './Jia.css';
import { Tooltip, Drawer } from 'antd';
import { Bar as BarChart, Doughnut } from 'react-chartjs-2';
import PredictChart from './myChart';
const unitPx = 10;
const barHeight = 30;
// sample data
let schedules = [
    [
        {
            patientName: "张三",
            secondInfo: "张三 8:30~9:30 李医生",
            thirdInfo: "张三 8:30~9:30 李医生 三级信息",
            beginIndex: 0,
            timeDuration: 10
        },
        {
            patientName: "李四",
            secondInfo: "李四 8:30~9:30 李医生",
            thirdInfo: "李四 8:30~9:30 李医生 三级信息",
            beginIndex: 18,
            timeDuration: 5
        }
    ],
    [
        {
            patientName: "王五",
            secondInfo: "王五 8:30~9:30 李医生",
            thirdInfo: "王五 8:30~9:30 李医生 三级信息",
            beginIndex: 9,
            timeDuration: 20
        }
    ],
    [
        {
            patientName: "赵六",
            secondInfo: "赵六 8:30~9:30 李医生",
            thirdInfo: "赵六 8:30~9:30 李医生 三级信息",
            beginIndex: 10,
            timeDuration: 8
        },
        {
            patientName: "unknown",
            secondInfo: "unknown 8:30~9:30 李医生",
            thirdInfo: "张三 8:30~9:30 李医生 三级信息",
            beginIndex: 30,
            timeDuration: 22
        }
    ]
];

class OperationItem extends Component {
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
    render() {
        return (<div className="OperationItem"
            style={{ left: this.props.beginIndex * unitPx + "px" }}>
            <div className="TimeTag">

            </div>
            <Tooltip placement="topLeft" title={this.props.secondInfo}>
                <div className="OperationItemBody" onClick={this.showDrawer}
                    style={{ width: this.props.timeDuration * unitPx + "px" }}>
                    {this.props.patientName}
                </div>
            </Tooltip>
            <div className="TimeTag">
            </div>
            <Drawer
                title="详细信息"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <p>{this.props.thirdInfo}</p>
                <div className='chart'>
                    <PredictChart />
                </div>
            </Drawer>

        </div>);
    }
}

class BedSchedule extends Component {
    render() {
        return <div className="BedSchedule">
            {
                [...Array(97).keys()].map(x => {
                    return <div className="Hr" style={{ left: x * unitPx * 3 + "px" }}>
                    </div>
                })
            }
            {
                this.props.schedule.map((x, y) => {
                    return <OperationItem key={y}
                        patientName={x.patientName}
                        beginIndex={x.beginIndex}
                        timeDuration={x.timeDuration}
                        secondInfo={x.secondInfo}
                        thirdInfo={x.thirdInfo} />
                })
            }
        </div>
    }
}

class OperationSchedule extends Component {
    render() {
        return <div className="OperationSchedule">
            {this.props.schedules.map(
                (schedule, bedIndex) => {
                    return <BedSchedule key={bedIndex} bedIndex={bedIndex} schedule={schedule} />
                }
            )}
        </div>
    }
}

function Jia() {
    return (
        <div className="App">
            <div>横轴</div>
            <div>
                <div className='YAxis'>纵轴</div>
                <OperationSchedule schedules={schedules} />
            </div>
        </div>
    );
}

// [('RM > 6.62', 10.017092479517238),
//  ('LSTAT <= 6.87', 5.189813586739314),
//  ('TAX=193', 1.84248629979142),
//  ('PTRATIO=17', 0.3955342873536875),
//  ('RAD=3', -0.36039976416318614)]

class Chart extends Component {
    render() {
        const data = {
            labels: ['January', 'February'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: [45, 55],
            }],
        };

        return (
            <Doughnut data={data} />
        );
    }
}

export { Jia, Chart };