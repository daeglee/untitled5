// dateType에 따라
// 임시적인 chartUpdate의 Parameter인
// startTime값과 endTime값을 채워줍니다.

import ChartUpdate from "./ChartUpdate";

export function MockChartInitiate(chartType, rawDataType, dateType, afterThen, resourceList){
    const endTime = Math.floor(Date.now() /1000);
    const startTime = endTime - dateType.second * chartType.dataSize + 1;

    ChartUpdate(chartType, rawDataType, dateType, afterThen, startTime, endTime, resourceList);
}

export function MockChartUpdate(chartType, rawDataType, dateType, afterThen, resourceList){
    const endTime = Math.floor(Date.now() /1000);

    ChartUpdate(chartType, rawDataType, dateType, afterThen, endTime, endTime, resourceList);
}