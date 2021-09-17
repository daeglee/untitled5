import './App.css';
import {useRef, useState} from "react";
import ChartList from "./chart/ChartList";
import {ChartType, DateType, DataType} from "./chart/DataType";
import {Link, Route} from "react-router-dom";
import Edit from "./Edit";

function App() {
  const [charts, setCharts] = useState([
    {
      id: 1,
      chartType: ChartType.LINE_CHART,
      rawDataType: DataType.CPU,
      dateType: DateType.REAL_TIME
    },
    {
      id: 2,
      chartType: ChartType.AREA_CHART,
      rawDataType: DataType.MEMORY,
      dateType: DateType.REAL_TIME
    },
    {
      id: 3,
      chartType: ChartType.PIE_CHART,
      rawDataType: DataType.CPU,
      dateType: DateType.REAL_TIME // CPU Usage의 PIE CHART는 애초에 dateType이 REAL_TIME밖에 없음
      // 이러한 제약사항을 추가해야할듯
    },
    {
      id: 4,
      chartType: ChartType.BAR_CHART,
      rawDataType: DataType.MEMORY,
      dateType: DateType.REAL_TIME
    },

    {
      id: 5,
      chartType: ChartType.SCATTER_CHART,
      rawDataType: DataType.MEMORY,
      dateType: DateType.REAL_TIME
    },

  ]);

  return (
      <>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit">편집하기</Link>
            </li>
          </ul>
          <hr />
          <Route path="/" exact={true}
                 render={() => <ChartList charts={charts}/>}/>
          <Route path="/edit" render={Edit} />
        </div>
      </>
  );
}

export default App;
