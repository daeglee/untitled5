import React, {useEffect, useState} from 'react'
import {
    ScatterChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    XAxis, Legend, Scatter, ResponsiveContainer, ZAxis
} from "recharts";
import * as config from "../../config";
import {ChartType} from "../DataType";
import {toDate} from "date-fns";
import TimeFormatter from "../functions/TimeFormatter";
import {MockChartUpdate,MockChartInitiate} from "../functions/MockChartUpdate";
import {useInterval} from "../../util/useInterval";


function AreaChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.SCATTER_CHART;
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

    //TODO: 리소스가 여러개인 경우, 이렇게하면 되는 듯 하다.
    // const COLORS = ["#8884d8", "#82ca9d"];
    // const ScatterList = datas.map((data, index) => (<Scatter data={data} fill={COLORS[index % COLORS.length]}/>))

    return (
        <>
            <div>
                <h2>
                    {rawDataType.title}
                </h2>
            </div>

            <ResponsiveContainer width={config.GRAPH_WIDTH} height={config.GRAPH_HEIGHT}>
            <ScatterChart
                data={data}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="logTime"

                       tickFormatter={(logTime) => {
                    const date = toDate(logTime * 1000);

                    return TimeFormatter(date, dateType);
                }}/>
                <YAxis type="number" dataKey={rawDataType.YAxisDataKey}/>
                <Legend/>

                <Scatter name="data 1" dataKey={rawDataType.YAxisDataKey} fill="#8884d8"
                         isAnimationActive={false}/>
            </ScatterChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartComposite;