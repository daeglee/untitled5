import AreaChartComposite from "./composite/AreaChartComposite";
import {ChartType, RawDataType, DateType} from "./RawDataType";
import PieChartComposite from "./composite/PieChartComposite";
import LineChartComposite from "./composite/LineChartComposite";
import BarChartComposite from "./composite/BarChartComposite";
import ScatterChartComposite from "./composite/ScatterChartComposite";


function getRawDataType(rawDataTypeString){
    let rawDataType;

    switch (rawDataTypeString){
        case RawDataType.CPU.name:
        default:
            rawDataType = RawDataType.CPU;
            break;
        case RawDataType.MEMORY.name:
            rawDataType = RawDataType.MEMORY;
            break;
    }
    return rawDataType;
}

function ChartCompositeFactory({chartType, rawDataType, dateTypeString, resourceList}){
    let dateType;

    switch (dateTypeString){
        case DateType.REAL_TIME.name:
        default:
            dateType = DateType.REAL_TIME;
            break;
        case DateType.MINUTE.name:
            dateType = DateType.MINUTE;
            break;
        case DateType.HOUR.name:
            dateType = DateType.HOUR;
            break;
        case DateType.DAY.name:
            dateType = DateType.DAY;
            break;
        case DateType.MONTH.name:
            dateType = DateType.MONTH;
            break;
    }

    switch (chartType){
        case ChartType.AREA_CHART.name:
            return (
                <AreaChartComposite rawDataType={rawDataType} dateType={dateType} resourceList={resourceList}/>
            );
        case ChartType.PIE_CHART.name:
            return (
                <PieChartComposite rawDataType={rawDataType} resourceList={resourceList}/>
            );
        case ChartType.LINE_CHART.name:
            return (
                <LineChartComposite rawDataType={rawDataType} dateType={dateType} resourceList={resourceList}/>
            );
        case ChartType.BAR_CHART.name:
            return (
                <BarChartComposite rawDataType={rawDataType} dateType={dateType} resourceList={resourceList}/>
            );
        case ChartType.SCATTER_CHART.name:
            return (
                <ScatterChartComposite rawDataType={rawDataType} dateType={dateType} resourceList={resourceList}/>
            );
        default:
            return (
                <div/>
            )
    }

}



function ChartComposite({chart}){
    const rawDataType = getRawDataType(chart.rawDataType);
    return (
        <>
            <div className="chartTitle">
                {rawDataType.title}
            </div>
            <ChartCompositeFactory
                chartType={chart.chartType}
                rawDataType={rawDataType}
                dateTypeString={chart.dateType}
                resourceList={chart.resourceList}
            />
        </>
    );
}

export default ChartComposite;