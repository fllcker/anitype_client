


export const ani_url = 'https://anilibria.tv/'
export const api_url = 'https://api.anilibria.tv/v3/'


export const search_url = api_url + 'title/search?search='

export const getSearchUrl = (query) => {
    return search_url + query
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