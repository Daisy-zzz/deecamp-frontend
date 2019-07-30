import React, {Component} from 'react';
import './Jia.css';

const unitPx = 10;
const barHeight = 30;

let schedules = [
    [
        {
            patientName: "张三",
            beginIndex: 0,
            timeDuration: 10
        },
        {
            patientName: "李四",
            beginIndex: 18,
            timeDuration: 5
        }
    ],
    [
        {
            patientName: "王五",
            beginIndex: 9,
            timeDuration: 20
        }
    ],
    [
        {
            patientName: "赵六",
            beginIndex: 10,
            timeDuration: 8
        },
        {
            patientName: "unknown",
            beginIndex: 30,
            timeDuration: 22
        }
    ]
];

class OperationItem extends Component {
    render() {
        return <div className="OperationItem"
                    style={{left: this.props.beginIndex * unitPx + "px"}}>
            <div className="TimeTag">

            </div>
            <div className="OperationItemBody"
                 style={{width: this.props.timeDuration * unitPx + "px"}}>
                {this.props.patientName}
            </div>
            <div className="TimeTag">
            </div>
        </div>;
    }
}

class BedSchedule extends Component {
    render() {
        return <div className="BedSchedule">
            {
                [...Array(97).keys()].map(x => {
                    if (this.props.bedIndex === 0) {
                        return <div className="Hr"
                                    style={{
                                        left: x * unitPx * 3 + "px",
                                        height: barHeight * 3 + "px",
                                        marginTop: -barHeight + "px"}}>

                        </div>
                    }
                    return <div className="Hr" style={{left: x * unitPx * 3 + "px"}}>

                    </div>
                })
            }
            {
                this.props.schedule.map((x, y) => {
                    return <OperationItem key={y}
                        patientName={x.patientName}
                        beginIndex={x.beginIndex}
                        timeDuration={x.timeDuration} />
                })
            }
        </div>
    }
}

class OperationSchedule extends Component {
    render() {
        return <div className="OperationSchedule"
                    style={{
                        width: 96 * unitPx + "px",
                        height: this.props.schedules.length * unitPx * 2 + "px"
                    }}>
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
        <OperationSchedule schedules={schedules} />
    </div>
  );
}

export default Jia;
