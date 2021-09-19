import axios from 'axios';

export async function getCpuUsages(dataSize) {
    const response = await axios.get(
        `/api/cpu/list/${dataSize}`
    );
    return response.data;
}

export async function getMemoryUsages(dataSize) {
    const response = await axios.get(
        `/api/memory/list/${dataSize}`
    );
    return response.data;
}

export async function getChartList() {
    const response = await axios.get(
        `/api/chart/list`
    );
    return response.data;
}



