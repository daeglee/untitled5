import axios from 'axios';

export async function getChartList() {
    const response = await axios.get(
        `/api/chart/list`
    );
    return response.data;
}

export async function postChartList(charts) {
    const response = await axios.post(
        `/api/chart/list/save`,
        charts, {
            headers: {
                "Content-Type": `application/json`,
            }}
    );
    return response.data;
}

export async function postChart(chart) {
    const response = await axios.post(
        `/api/chart/save`,
        chart, {
            headers: {
                "Content-Type": `application/json`,
            }}
    );
    return response.data;
}



