import axios from "axios";

export const kodikUrl = 'https://kodikapi.com/'
export const kodikToken = '3bd0a27dfccd284c54f4889f4a7d6453'

export function getSearchKodik(query) {
    return axios({
        url: kodikUrl + `search?token=${kodikToken}&types=anime&title=${query}`,
        method: 'get'
    })
}