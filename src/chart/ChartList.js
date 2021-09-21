import ChartComposite from "./ChartComposite";
import {Rnd} from 'react-rnd';
import '../css/chart.css';
import CreateChartButton from "./widget/CreateChartButton";

function ChartList({charts, setCharts, isEditMode}) {

    const editButtons = (chart, index) => {
        if(isEditMode)
        return (
            <CreateChartButton isEditMode={true} setCharts={setCharts} chart={chart} charts={charts} index={index}/>
        )

    }

    return (
        <div>
            {charts.map((chart, index) => (
                <>
                    <Rnd
                        enableResizing={isEditMode}
                        disableDragging={!isEditMode}
                        default={{
                            x: chart.x,
                            y: chart.y,
                            width: chart.width,
                            height: chart.height,
                        }}
                        onDragStop={(e, d) => {
                            const cloneChart = charts.slice();
                            cloneChart[index].x = d.x
                            cloneChart[index].y = d.y
                            setCharts(cloneChart);
                        }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            const cloneChart = charts.slice();
                            cloneChart[index].width = ref.style.width;
                            cloneChart[index].height = ref.style.height;
                            setCharts(cloneChart);
                        }}
                        minWidth={100}
                        minHeight={100}
                        bounds="window"
                    >
                        <div className="box">
                            {editButtons(chart, index)}
                            <ChartComposite chart={chart}/>
                        </div>

                    </Rnd>
                </>
            ))}
        </div>
    );
}

export default ChartList;