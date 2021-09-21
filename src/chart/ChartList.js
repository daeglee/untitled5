import ChartComposite from "./ChartComposite";
import {Rnd} from 'react-rnd';
import '../css/chart.css';
import CreateChartButton from "./widget/CreateChartButton";
import styled from "@emotion/styled/macro";

export const ChartEdit = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0.5;
  top: 40%;
  left: 40%;
  &:hover {
    color: crimson;
  }
  display: none;
`;

export const ChartDelete = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0.5;
  top: 40%;
  left: 50%;
  &:hover {
    color: crimson;
  }
  display: none;
`;

const Box = styled.div`
  border: 1px solid black;
  height: 100%;
  width: 100%;
  position: relative;
  &:hover {
    ${ChartDelete} {
      display: initial;
    }
    ${ChartEdit} {
      display: initial;
    }
  }
`;


function ChartList({charts, setCharts, isEditMode}) {

    const editButtons = (chart, index) => {
        if(isEditMode)
        return (
            <CreateChartButton isEditMode={isEditMode} setCharts={setCharts} chart={chart} charts={charts} index={index}/>
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
                        <Box>
                            {editButtons(chart, index)}
                            <ChartComposite chart={chart}/>
                        </Box>

                    </Rnd>
                </>
            ))}
        </div>
    );
}

export default ChartList;