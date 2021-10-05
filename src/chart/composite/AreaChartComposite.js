import React, {useEffect, useState} from 'react'
import {
    AreaChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Area,
    XAxis,
    ResponsiveContainer, Legend
} from "recharts";
import {toDate} from "date-fns";
import {ChartType} from "../RawDataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import {MockChartUpdate, MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";
import '../../css/chart.css';
import {useThemeContext} from "../../context/ChartThemeProvider";


function AreaChartComposite({rawDataType, dateType, resourceList}) {
    const typeInfo = ChartType.AREA_CHART;
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

    // Check update


    function linearGradientName(index) {
        return "url(#" + index + ")"
    }

    return (
        <>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        {theme.map((value, index) =>
                            <linearGradient key={index.toString()} id={index} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={value} stopOpacity={0.45}/>
                                <stop offset="75%" stopColor={value} stopOpacity={0.05}/>
                            </linearGradient>
                        )
                        }
                    </defs>

                    <CartesianGrid strokeDasharray="3 3"/>


                    {resourceList.map((value, index) =>
                        <Area key={index.toString()} dataKey={value.resource} stroke={theme[3]}
                              fill={linearGradientName(index)}
                              isAnimationActive={false}/>
                    )}

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
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        domain={[0, 100]}
                        tickFormatter={(number) => number}
                    />

                    <Tooltip content={<ChartToolTip/>}/>
                    <Legend />
                    <CartesianGrid opacity={0.1} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartComposite;