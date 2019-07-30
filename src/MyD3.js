import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Label } from "bizcharts";
import DataSet from "@antv/data-set";
import data from './utils/d3data'

class MyD3 extends React.Component {
    render() {
        const { DataView } = DataSet;
        const dv = new DataView();
        dv.source(data)
            .transform({
                type: "fold",
                fields: ["Agree", "Disagree", 'x', 'y'],
                key: "duration",
                value: "value",
                retains: ["yAxis", 'timeDuration']
            });
        const colorMap = {
            Agree: "#80B2D3",
            Disagree: "#EC7743", 
            x: "#80B2D3",
            y: "#D9F0F6",
        };
        return (
            <div>
                <Chart height={window.innerHeight} data={dv} forceFit padding={[100, 100, 100, 100]}>
                    <Axis name="yAxis" />
                    <Axis
                        name="value"
                        position="right"
                    />
                    <Coord transpose />
                    <Tooltip />
                    <Legend />
                    <Geom
                        type="intervalStack"
                        position="yAxis*value"
                        color={[
                            "duration",
                            ['#80B2D3', '#EC7743']
                        ]}
                        shape="smooth"
                    >
                        <Label content={["yAxis*timeDuration", (yAxis, timeDuration) => {
                            return `${timeDuration}:${yAxis}`;
                        }]} textStyle={{
                            textAlign: 'center', // alignment of label text: 'start'|'middle'|'end'
                            fill: '#404040', // color of label text
                            fontSize: '14', // font size of label text
                            textBaseline: 'top' // baseline of label test: top middle bottom，默认为middle
                        }} offset={-50} />

                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default MyD3;
