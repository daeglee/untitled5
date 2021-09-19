import ChartComposite from "./ChartComposite";
import {Rnd} from 'react-rnd';
import '../css/chart.css';

function ChartList({charts}) {
    console.log(charts)

    return (
        <div>
            {charts.map( (chart,index) => (
                <Rnd
                    enableResizing={true}
                    default={{
                        x: chart.x,
                        y: chart.y,
                        width: chart.width,
                        height: chart.height,
                    }}
                    minWidth={100}
                    minHeight={100}
                    bounds="window"
                >
                    <div className="box">
                        <ChartComposite chart={chart} />
                    </div>
                </Rnd>
            ))}
        </div>
    );
}

export default ChartList;