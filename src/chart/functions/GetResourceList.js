import axios from "axios";

export async function getResourceList() {
    const response = await axios.get(
        `/api/resource/list`
    );
    return response.data;
}