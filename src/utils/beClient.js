import axios from "axios";

export const beUrl = 'https://anitypes.site/'

export function auth(username, password, type = 'login') {
    return axios({
        url: beUrl + 'auth/' + type,
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

export function getFavs(token) {
    return axios({
        url: beUrl + 'note/fav/my',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getFavStatus(token, releaseId) {
    return axios({
        url: beUrl + 'note/fav/check/' + releaseId,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export function changeFav(token, releaseId, status = true, fun) {
    axios({
        url: beUrl + 'note/fav/' + (status ? 'add' : 'remove') + '/' + releaseId,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(e => fun(status))
        .catch(e => console.error(e))
}

export function getEpisodesViewsByRelease(token, releaseId) {
    return axios({
        url: beUrl + `view/episodes/release/${releaseId}`,
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
    })
}

export function getEpisodeTime(token, releaseId, episodeId) {
    return axios({
        url: beUrl + `view/episodes/time/${releaseId}/${episodeId}`,
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
    })
}

export function sendEmailVerify(token, email) {
    return axios({
        url: beUrl + 'users/verify/getemail',
        method: 'post',
        headers: {'Authorization': `Bearer ${token}`},
        data: {
            email: email
        }
    })
}