import axios from "axios";
import {api_url} from "./anilibria";

export function getLastReleases(fun, page = 1, limit = 15) {
    axios({
        url: api_url + `title/updates?page=${page}&items_per_page=${limit}`,
        method: 'get'
    })
        .then(r => fun(r?.data?.list))
}

export function getRandomReleaseId() {
    return axios({
        url: api_url + 'title/random?filter=id',
        method: 'get'
    })
}

export function getCurrentReleases(fun, releasesString) {
    axios({
        url: api_url + 'title/list?id_list=' + releasesString,
        method: 'get'
    })
        .then(r => fun(r.data))
}