import React, {useEffect, useState} from 'react'
import {
    CartesianGrid,
    YAxis,
    Tooltip,
    Area,
    XAxis,
    Bar, ResponsiveContainer,
    BarChart
} from "recharts";
import {format, toDate} from "date-fns";
import {useDataContext} from "../../context/ChartDataUpdateContextProvider";
import * as config from "../../config";
import {ChartType} from "../DataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import {MockChartUpdate,MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";


function BarChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.BAR_CHART;
    const [data, setData] = useState([]);

    const UpdateInfo = useDataContext();

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
            <BarChart
                width={config.GRAPH_WIDTH}
                height={config.GRAPH_HEIGHT}
                data={data}>

                <CartesianGrid strokeDasharray="3 3"/>
                <YAxis dataKey={rawDataType.YAxisDataKey}/>

                <XAxis
                    dataKey="logTime"
                    tickFormatter={(logTime) => {
                        const date = toDate(logTime * 1000);

                        return TimeFormatter(date, dateType);
                    }}
                />

                <Bar stackId="a" fill="#8884d8" dataKey={rawDataType.YAxisDataKey}
                     isAnimationActive={false}/>
                <Tooltip content={<ChartToolTip/>}/>
                <CartesianGrid opacity={0.1} vertical={false}/>
            </BarChart>
        </>
    );
}

export default BarChartComposite;