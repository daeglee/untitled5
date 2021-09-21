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


/**
 * for widget
 */
export const DataTypeList =
    Object.keys(RawDataType).map((value, idx) =>
        ({
            name: RawDataType[Object.keys(RawDataType)[idx]].title,
            id: idx,
            controllerAddress: RawDataType[Object.keys(RawDataType)[idx]].controllerAddress
        }));

export const ChartTypeList =
    Object.keys(ChartType).map((value, idx) =>
        ({
            name: ChartType[Object.keys(ChartType)[idx]].name,
            id: ChartType[Object.keys(ChartType)[idx]].id,
        }));
export const DateTypeList =
    Object.keys(DateType).map((value, idx) =>
        ({
            name: DateType[Object.keys(DateType)[idx]].name,
            id: idx,
        }));
