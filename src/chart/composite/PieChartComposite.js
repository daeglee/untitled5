import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Line} from 'recharts';
import {ChartType, DateType} from "../RawDataType";
import * as config from "../../config";
import {MockChartInitiate, MockChartUpdate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";


// PIE Only support realtime
const DEFAULT_COLOR = '#DDDDDD'; // for background color
const COLORS = ['#0088FE', "#FF8042", "#FF2323"]; // normal, yellow, red
const typeInfo = ChartType.PIE_CHART;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {

    const fontSize = 24;
    if (index === 0)
        return (
            <text x={cx - fontSize + fontSize / 4} y={cy} fill="black" fontSize={fontSize} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    else
        return "";
};


function PieChartComposite({rawDataType, resourceList}) {

    const [data, setData] = useState([[
        {id: 0, value: 33},
        {id: 1, value: 67}
    ],]);

    useEffect(() => {
        const afterThen = (x) => {
            const tempArray = [];

            resourceList.map((value, index) => {
                const lastestValue = x[0][Object.getOwnPropertyNames(x[0])[index]];
                tempArray.push([
                    {id: 0, value: lastestValue},
                    {id: 1, value: 100 - lastestValue}
                ]);
            })
            if(tempArray === []){
                return;
            }

            setData(tempArray);
        }
        MockChartInitiate(typeInfo, rawDataType, DateType.REAL_TIME, afterThen, resourceList);
    }, []);


    useInterval(() => {
        const afterThen = (x) => {
            const tempArray = [];

            resourceList.forEach((value, index) => {
                const lastestValue = x[0][Object.getOwnPropertyNames(x[0])[index]];
                if(lastestValue == null){
                    return;
                }
                tempArray.push([
                    {id: 0, value: lastestValue},
                    {id: 1, value: 100 - lastestValue}
                ]);
            })
            if(tempArray === []){
                return;
            }

            setData(tempArray);
        }
        MockChartUpdate(typeInfo, rawDataType, DateType.REAL_TIME, afterThen, resourceList);

    }, 1000);

    function getCell(index) {
        if(data[index] != null){
            return <Cell key={`cell-0`}
                         fill={data[index][0].value > config.PIE_RED ? COLORS[2] : data[index][0].value > config.PIE_YELLOW ? COLORS[1] : COLORS[0]}/>;
        }else{
            return <Cell key={`cell-0`}/>
        }
    }

    return (
        <>
            {resourceList.map((value, index) =>
                <ResponsiveContainer width="100%" height="90%" key={index.toString()}>
                    <PieChart>
                        <Pie
                            data={data[index]}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            innerRadius="70%"
                            outerRadius="85%"
                            startAngle={180}
                            endAngle={-180}
                            fill="#8884d8"
                            dataKey="value"
                            isAnimationActive={false}
                        >
                            {getCell(index)}

                            <Cell key={`cell-1`} fill={DEFAULT_COLOR}/>
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </>
    );

}

export default PieChartComposite;