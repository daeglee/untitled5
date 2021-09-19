import React, {useEffect, useState} from 'react'
import {
    AreaChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Area,
    XAxis,
    ResponsiveContainer
} from "recharts";
import {format, toDate} from "date-fns";
import * as config from "../../config";
import {ChartType} from "../RawDataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import {MockChartUpdate,MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";
import '../../css/chart.css';


function AreaChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.AREA_CHART;
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
    // Check update


    return (
        <>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}/>
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis dataKey={rawDataType.YAxisDataKey}/>
                    <Area dataKey={rawDataType.YAxisDataKey} stroke="#2451B7" fill="url(#color)"
                          isAnimationActive={false}/>

                    <XAxis
                        dataKey="logTime"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(logTime) => {
                            const date = toDate(logTime * 1000);

                            return TimeFormatter(date, dateType);
                        }}
                    />

                    <YAxis
                        datakey={rawDataType.YAxisDataKey}
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        domain={[0, 100]}
                        tickFormatter={(number) => number}
                    />

                    <Tooltip content={<ChartToolTip/>}/>
                    <CartesianGrid opacity={0.1} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartComposite;