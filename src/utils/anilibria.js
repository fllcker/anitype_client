


export const ani_url = 'https://anilibria.tv/'
export const api_url = 'https://api.anilibria.tv/v3/'


export const getSearchUrl = (query, limit = 20) => {
    return api_url + 'title/search?search=' + query + '&items_per_page=' + limit
}

export const getPoster = (url) => {
    return ani_url + url
}

export function compressString(str, maxLength = 450) {
    if (str.length <= maxLength) {
        return str; // Возвращает исходную строку, если она уже короче или равна maxLength
    }

    return str.substring(0, maxLength) + "..."; // Обрезает строку и добавляет многоточие в конце
}

export function getStringOfQualities(obj) {
    let result= []

    if (obj?.fhd)
        result.push('1080')

    if (obj?.hd)
        result.push('720')

    if (obj?.sd)
        result.push('480')

    return result.join(', ')
}

export function makeNormalList(obj) {
    let array = []
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            array.push(obj[key])
        }
    }
    return array;
}