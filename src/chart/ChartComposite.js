import AreaChartComposite from "./composite/AreaChartComposite";
import {ChartType} from "./DataType";
import PieChartComposite from "./composite/PieChartComposite";
import LineChartComposite from "./composite/LineChartComposite";
import BarChartComposite from "./composite/BarChartComposite";
import ScatterChartComposite from "./composite/ScatterChartComposite";

function ChartCompositeFactory({chartType, rawDataType, dateType}){

    switch (chartType){
        case ChartType.AREA_CHART:
            return (
                <AreaChartComposite rawDataType={rawDataType} dateType={dateType}/>
            );
        case ChartType.PIE_CHART:
            return (
                <PieChartComposite rawDataType={rawDataType}/>
            );
        case ChartType.LINE_CHART:
            return (
                <LineChartComposite rawDataType={rawDataType} dateType={dateType}/>
            );
        case ChartType.BAR_CHART:
            return (
                <BarChartComposite rawDataType={rawDataType} dateType={dateType}/>
            );
        case ChartType.SCATTER_CHART:
            return (
                <ScatterChartComposite rawDataType={rawDataType} dateType={dateType}/>
            );
        default:
            return (
                <div/>
            )
    }

}



function ChartComposite({ chart }){
    return (
        <ChartCompositeFactory
            chartType={chart.chartType}
            rawDataType={chart.rawDataType}
            dateType={chart.dateType}
        />
    );
}

export default ChartComposite;