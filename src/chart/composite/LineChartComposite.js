import React, {useEffect, useState} from 'react'
import {
    LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    XAxis,
    ResponsiveContainer, Legend, Line
} from "recharts";
import {toDate} from "date-fns";
import * as config from "../../config";
import {ChartType} from "../DataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import {MockChartUpdate,MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";


function LineChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.LINE_CHART;
    const [data, setData] = useState([]);

    useEffect(() => {
        const afterThen = (x) => {
            setData(x);
        }
        MockChartInitiate(typeInfo, rawDataType, dateType, afterThen);
    }, []);



    useInterval( ()=>{
        const afterThen = (x) => {
            const dataSize = x.length;
            const stateSize = data.length;
            let sliceSize = 0
            if(typeInfo.dataSize < dataSize + stateSize){
                sliceSize = dataSize + stateSize - typeInfo.dataSize;
            }
            setData( (prevData) => [...prevData, ...x].slice(sliceSize));
        }
        MockChartUpdate(typeInfo, rawDataType, dateType, afterThen);

    }, 1000);

    return (
        <>
            <div>
                <h2>
                    {rawDataType.title}
                </h2>
            </div>
            <ResponsiveContainer width={config.GRAPH_WIDTH} height={config.GRAPH_HEIGHT}>
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="logTime"
                           tickFormatter={(logTime) => {
                               const date = toDate(logTime * 1000);

                               return TimeFormatter(date, dateType);
                           }}/>
                    <YAxis dataKey={rawDataType.YAxisDataKey}/>
                    <Tooltip content={<ChartToolTip/>}/>
                    <Legend />
                    <Line type="monotone" dataKey={rawDataType.YAxisDataKey} stroke="#8884d8" activeDot={{ r: 8 }}
                          isAnimationActive={false}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default LineChartComposite;