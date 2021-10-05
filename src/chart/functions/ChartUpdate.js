import axios from "axios";

async function setStateApi(rawDataType, dateType, startTime, endTime, resourceList) {

    const resources = [];
    resourceList.forEach(
        (value) =>{
            resources.push(value.resource);
        }
    )

    const response = await axios.get(
        `/api/${rawDataType.controllerAddress}/${startTime}/${endTime}/${dateType.name}?resources=${resources}`
    );
    return response.data;
}
// 함수의 매개변수가 너무 많아서 리팩토링이 필요할 수도 있습니다.
// setState
function ChartUpdate(chartType, rawDataType, dateType, afterThen, startTime, endTime, resourceList) {

    setStateApi(rawDataType, dateType, startTime, endTime, resourceList).then(afterThen);
}
export default ChartUpdate;