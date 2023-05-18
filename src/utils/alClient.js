import axios from "axios";
import {api_url, getSearchUrl} from "./anilibria";

export function getLastReleases(fun, page = 1, limit = 15) {
    axios({
        url: api_url + `title/updates?page=${page}&items_per_page=${limit}`,
        method: 'get'
    })
        .then(r => fun(r?.data?.list))
        .catch(e => console.error(e))
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
        .catch(e => console.error(e))
}

export function getAnimeById(id) {
    return axios({
        url: api_url + 'title?id=' + id,
        method: 'get'
    })
}

export function getSearch(query) {
    return axios({
        url: getSearchUrl(query),
        method: 'get'
    })
}