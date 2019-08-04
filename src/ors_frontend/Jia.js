import React, { Component } from 'react';
import { Tooltip, Drawer, Button } from 'antd';
import { Bar as BarChart, Doughnut } from 'react-chartjs-2';
import PredictChart from './myChart';
import API from "./utils/api";
import './Jia.css';

const barHeight = 30;
const unitPx = 15;

let schedules = 
[
    {
        "roomInfo": "Room 1",
        "operation": [
            {
                "patientName": "张三",
                "secondInfo": "张三 8:30~9:30 李医生",
                "thirdInfo": "张三 8:30~9:30 李医生 三级信息",
                "beginIndex": 0,
                "operationDuration": 12,
                "recoverDuration": 2,
                "cleanDuration": 6
            },
            {
                "patientName": "李四",
                "secondInfo": "李四 8:30~9:30 李医生",
                "thirdInfo": "李四 8:30~9:30 李医生 三级信息",
                "beginIndex": 18,
                "operationDuration": 6,
                "recoverDuration": 3,
                "cleanDuration": 4
            }
        ]
    },
    {
        "roomInfo": "Room 2",
        "operation": [
            {
                "patientName": "王五",
                "secondInfo": "王五 8:30~9:30 李医生",
                "thirdInfo": "王五 8:30~9:30 李医生 三级信息",
                "beginIndex": 9,
                "operationDuration": 20,
                "recoverDuration": 1,
                "cleanDuration": 2
            }
        ]
    },
    {
        "roomInfo": "Room 2",
        "operation": []
    },
    {
        "roomInfo": "Room 3",
        "operation": []
    },
    {
        "roomInfo": "Room 4",
        "operation": []
    }
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
                <div className="OperationItemBody" onClick={this.showDrawer} style={{ width: this.props.operationDuration * unitPx + "px" }}>
                    {this.props.patientName}
                </div>
            </Tooltip>
            <div className="OperationItemBody"
                style={{ width: this.props.recoverDuration * unitPx + "px", background: '#FFAB8A' }}>
            </div>
            <div className="OperationItemBody"
                style={{ width: this.props.cleanDuration * unitPx + "px", background: '#01D2BE' }}>
            </div>
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

function OperationScheduleTable(props) {
        return (<div>
            <div className={"OperationSchedule"}>
                <table style={{tableLayout: "fixed", width: "200px"}}>
                    {/*-------------------横轴------------------*/}
                    <thead className={"stickyRow"}>
                        <tr className={"stickyRow"}>
                            <th className={"stickyRow bedInfo scheduleHeader"} style={{zIndex: 4}}>{null}</th>
                            {[...Array(64).keys()].map(x => {
                                return <th className={"stickyRow scheduleHeader quarterCell"} key={x}>
                                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                                        <p className={"timeTag"}>
                                            {!(x % 2) ? (("0" + (Math.floor(x / 4) + 8)).slice(-2) + ":" + (!(x % 4) ? "00" : "30")) : null}
                                        </p>
                                        {!(x % 4) ? <div className={"timePoint"}>{null}</div> : null}
                                    </div>
                                </th>
                            })}
                        </tr>
                    </thead>
                    {/*-------------------横轴------------------*/}
                    <tbody>
                        {props.schedules.map((bedSchedule, bedIdx) => {
                            return ([
                                <tr key={"space" + bedIdx} className={"stickyRow"}>
                                    <td className={"bedInfo spaceRow"}>{null}</td>
                                    {[...Array(64).keys()].map(y => {
                                        return <td className={"quarterCell spaceRow"} key={y}>{null}</td>
                                    })}
                                </tr>,
                                <tr key={"data" + bedIdx} className={"stickyRow"}>
                                    {/*-------纵轴-------*/}
                                    <td className={"bedInfo"}>{bedSchedule.roomInfo}</td>
                                    {/*-------纵轴-------*/}
                                    <td className={"quarterCell dataRow"}>
                                        <div className={"BedScheduleTd"}>
                                            {
                                                bedSchedule.operation.map((x, y) => {
                                                    return <OperationItem key={y}
                                                                          patientName={x.patientName}
                                                                          beginIndex={x.beginIndex}
                                                                          operationDuration={x.operationDuration}
                                                                          secondInfo={x.secondInfo}
                                                                          thirdInfo={x.thirdInfo}
                                                                          recoverDuration={x.recoverDuration}
                                                                          cleanDuration={x.recoverDuration} />
                                                })
                                            }
                                        </div>
                                    </td>
                                    {[...Array(63).keys()].map(y => {
                                        return <td className={"quarterCell dataRow"} key={y}>{null}</td>
                                    })}
                                </tr>
                            ])
                        })}
                        <tr className={"stickyRow"}>
                            <td className={"bedInfo"}>{null}</td>
                            {[...Array(64).keys()].map(y => {
                                return <td className={"quarterCell spaceRow"} key={y}>{null}</td>
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
}

class Jia extends Component {
    preview = () => { // 预览
        let values = [ // 数据从localStorage中取出来
            {

                "id": "1",
                "name": "张三",
                "gender": "男",
                "age": "70",
                "department": "心血管科",
                "operatingName": "心脏搭桥手术",
                "anaesthetic": "全身麻醉",
                "doctorName": "李四",
                "predTime": "120",
                "orId": "",
                "startTime": "",
                "recoverDuration": 1,
                "cleanDuration": 2
            }, {
                "id": "2",
                "name": "王二",
                "gender": "女",
                "age": "23",
                "department": "妇产科",
                "operatingName": "剖腹产手术",
                "anaesthetic": "全身麻醉",
                "doctorName": "王小二",
                "predTime": "100",
                "orId": "",
                "startTime": "15:00",
                "recoverDuration": 1,
                "cleanDuration": 2
            }
        ];
        fetch(API + '/preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            },
            responseType: 'blob',
            body: JSON.stringify(values)
        }).then(res => {
            if (res.status === 200) {
                return res.blob()
            }
        }).then(function (blob) {
            console.log(blob);
            let blobUrl = window.URL.createObjectURL(blob);
            window.open(blobUrl);
            // let filename = 'preview.pdf';
            // let a = document.getElementById('a_id');
            // a.href = blobUrl;
            // a.download = filename;
            // a.click();
            // window.URL.revokeObjectURL(blobUrl);
            // window.location.href = blobUrl;
            
        });
    };

    render(){
        return (
            <div className="App">
                <OperationScheduleTable schedules={schedules} />
                <Button type="primary" onClick={this.preview}>预览</Button>
            </div>
        )
    };
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
