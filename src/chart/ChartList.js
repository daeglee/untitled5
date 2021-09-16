import ChartComposite from "./ChartComposite";
import {useDataContext, useDispatchContext} from "../context/ChartDataUpdateContextProvider";

function ChartList({charts}) {
    const dispatch = useDispatchContext();

    // 현재 사용중인 배열의 타입의 가져와서
    // 타입의 배열로 실시간 데이터 요청하기(1초마다)
    // TODO: 이 방법보다 더 최적화되거나 나은 방법이 있을것으로 보인다.
    // 장애에 대비하여 모든 데이터에 대하여 logTime을 보낸다든지 하는..
    // 해당 방안에 대하여 테스트가 더 필요하다.
    // useInterval(async () => {
    // }, 1000);


    return (
        <div>
            {charts.map(chart => (
                <ChartComposite chart={chart} key={chart.id} />
            ))}
        </div>
    );
}

export default ChartList;