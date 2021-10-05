import React, {useEffect, useState} from 'react'
import {
    ScatterChart,
    CartesianGrid,
    YAxis,
    XAxis, Legend, Scatter, ResponsiveContainer, Line
} from "recharts";
import {ChartType} from "../RawDataType";
import {toDate} from "date-fns";
import TimeFormatter from "../functions/TimeFormatter";
import {MockChartUpdate,MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";
import {useThemeContext} from "../../context/ChartThemeProvider";


function AreaChartComposite({rawDataType, dateType, resourceList}) {
    const typeInfo = ChartType.SCATTER_CHART;
    const [data, setData] = useState([]);
    const theme = useThemeContext();

    useEffect(() => {
        const afterThen = (x) => {
            setData(x);
        }
        MockChartInitiate(typeInfo, rawDataType, dateType, afterThen, resourceList);
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
        MockChartUpdate(typeInfo, rawDataType, dateType, afterThen, resourceList);

    }, 1000);

    //TODO: 리소스가 여러개인 경우, 이렇게하면 되는 듯 하다.
    // const COLORS = ["#8884d8", "#82ca9d"];
    // const ScatterList = datas.map((data, index) => (<Scatter data={data} fill={COLORS[index % COLORS.length]}/>))

    return (
        <>
            <ResponsiveContainer width="100%" height="90%">
            <ScatterChart
                data={data}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="logTime"

                       tickFormatter={(logTime) => {
                    const date = toDate(logTime * 1000);

                    return TimeFormatter(date, dateType);
                }}/>
                <Legend/>
                {resourceList.map( (value, index) =>
                    <Scatter name={value.resource} key={index.toString()} dataKey={value.resource} fill={theme[index]}
                    isAnimationActive={false}/>
                )}
            </ScatterChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartComposite;