import React, {useEffect, useState} from 'react'
import {
    LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    XAxis,
    ResponsiveContainer, Legend, Line, Bar
} from "recharts";
import {toDate} from "date-fns";
import {ChartType} from "../RawDataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import {MockChartUpdate, MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";
import {useThemeContext} from "../../context/ChartThemeProvider";


function LineChartComposite({rawDataType, dateType, resourceList}) {
    const typeInfo = ChartType.LINE_CHART;
    const [data, setData] = useState([]);
    const theme = useThemeContext();

    useEffect(() => {
        const afterThen = (x) => {
            setData(x);
        }
        MockChartInitiate(typeInfo, rawDataType, dateType, afterThen, resourceList);
    }, []);


    useInterval(() => {
        const afterThen = (x) => {
            const dataSize = x.length;
            const stateSize = data.length;
            let sliceSize = 0
            if (typeInfo.dataSize < dataSize + stateSize) {
                sliceSize = dataSize + stateSize - typeInfo.dataSize;
            }
            setData((prevData) => [...prevData, ...x].slice(sliceSize));
        }
        MockChartUpdate(typeInfo, rawDataType, dateType, afterThen, resourceList);

    }, 1000);

    return (
        <>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="logTime"
                           tickFormatter={(logTime) => {
                               const date = toDate(logTime * 1000);

                               return TimeFormatter(date, dateType);
                           }}/>
                    <Tooltip content={<ChartToolTip/>}/>
                    <Legend/>
                    {resourceList.map( (value, index) =>
                        <Line type="monotone" key={index.toString()} dataKey={value.resource} stroke={theme[index]} activeDot={{r: 8}}
                        isAnimationActive={false}/>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default LineChartComposite;