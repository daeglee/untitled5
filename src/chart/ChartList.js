import ChartComposite from "./ChartComposite";
import {Rnd} from 'react-rnd';
import '../css/chart.css';
import CreateChartButton from "./widget/CreateChartButton";
import styled from "@emotion/styled/macro";
import {useDataContext, useDispatchContext} from "../context/ChartDataProvider";
import {useState} from "react";

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


function ChartList({isEditMode}) {
    const charts = useDataContext();
    const setCharts = useDispatchContext();

    const editButtons = (chart, index, changeState) => {
        if(isEditMode)
        return (
            <CreateChartButton isEditMode={isEditMode} chart={chart} index={index} changeState = {changeState}/>
        )

    }
    const [openDialog,setOpenDialog] = useState(false); // Dialog open에도 drag되는 문제
    const changeState = (openState) =>{
        setOpenDialog(openState);
    }

    return (
        <div>
            {charts.map((chart, index) => (
                <>
                    <Rnd
                        key={(index+1).toString()}
                        enableResizing={isEditMode && !openDialog}
                        disableDragging={!isEditMode || openDialog}
                        size={{ width: charts[index].width, height: charts[index].height}}
                        position={{x: charts[index].x, y: charts[index].y}}
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
                            {editButtons(chart, index,changeState)}
                            <ChartComposite chart={chart}/>
                        </Box>

                    </Rnd>
                </>
            ))}
        </div>
    );
}

export default ChartList;