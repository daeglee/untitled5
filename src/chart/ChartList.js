import ChartComposite from "./ChartComposite";
import {Rnd} from 'react-rnd';
import '../css/chart.css';
import {MdEdit, MdDelete} from 'react-icons/md';

function ChartList({charts, setCharts, isEditMode}) {

    const editClicked = () => {
        console.log("edit clicked");
    };
    let deleteClicked;

    const editButtons = (chart) => {
        if (isEditMode) {
            if (isNaN(chart.width)) {
                return (
                    <div className="chartEditNan" style={{
                        left: 0,
                        top: 0
                    }}>
                        <MdEdit size="24" onClick={editClicked}/>
                        <MdDelete size="24" onClick={deleteClicked}/>
                    </div>
                )
            } else {
                return (
                    <div className="chartEdit" style={{
                        left: 1 * chart.width / 3,
                        top: 2 * chart.height / 5
                    }}>
                        <MdEdit size={chart.width / 4} onClick={editClicked}/>
                        <MdDelete size={chart.width / 4} onClick={deleteClicked}/>
                    </div>
                )
            }
        }

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
                            <ChartComposite chart={chart}/>
                            {editButtons(chart)}
                        </div>

                    </Rnd>
                </>
            ))}
        </div>
    );
}

export default ChartList;