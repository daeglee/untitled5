//RawDataType
export const RawDataType = {
    CPU: {name: "cpu", title: "CPU Usage", YAxisDataKey: "cpuusage", controllerAddress: "cpu"},
    MEMORY: {name: "memory", title: "Memory Usage", YAxisDataKey: "memoryUsage", controllerAddress: "memory"}
}

export const ChartType = {
    AREA_CHART: {name: "area", dataSize: 20},
    PIE_CHART: {name: "pie", dataSize: 1},
    LINE_CHART: {name: "line", dataSize: 20},
    BAR_CHART: {name: "bar", dataSize: 10},
    SCATTER_CHART: {name: "scatter", dataSize: 16},
}

// 소문자로 데이터를 전달하기위해
// enum 타입이지만 소문자로 설정
export const DateType = {
    REAL_TIME: {name: "second", second: 1} ,
    MINUTE: {name: "minute", second: 60},
    HOUR: {name: "hour", second: 3600},
    DAY: {name: "day", second: 86400},
    MONTH: {name: "month", second: 1036800},
};


// TMI, 의식의 흐름

// type값이 해당 데이터의 실시간인지, Minute, hour인지에 대한 포괄적인 값으로 존재해야함
// data에 대한 타입
// chart Type에 대한 타입
// date Type에 대한 타입


// chartList로부터 type을 사용하여 chart를 생성하는 것


// chartType에 따라서는 확실히 다른 Function 파일이 필요하다
// -> 만드는 chart의 종류가 다르기 때문이다.

// rawDataType에 따라 다른 차트 function이 필요없을 것이다.
// ChartTypeToFunction을 사용하여 dataType에 따라 쿼리를 다르게 생성하고 있기 때문이다.

// dateType에 따라 다른 차트가 필요할까?
// 그에 따라 ToolTip과 Format을 변경해야할 것이다.
// ToolTip과 Format은 dateType에 정의해놓을까?
// config로 변경하면 좋을 것 같은데..
// config는 서버에 저장할 것이므로 default config를 저장해두고, 서버에서 값을 못불러오면 거기서 불러온 값을 사용한다는 컨셉으로
// ToolTip에 들어가는 값과 Format에 들어가는 값을 정리해야겠다.


// 고려사항이 3개이므로 switch, case를 사용하기는 어려울 것으로 보인다?
// ChartTypeToFunction에서 type을 사용하여 적절한 함수를 만드는 것