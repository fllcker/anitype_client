export function calcEpisodeDone(now, duration) {
    if (now && duration) {
        const percentWatched = (now / duration) * 100;

        if (percentWatched > 75) return true;
    }

    return false;
}

export function getCompletedEpisodes(episodeArray) {
    if (!episodeArray) return;

    return episodeArray
        .filter(episode => episode.done)
        .map(episode => episode?.episodeId);
}

export function removeDescAd(description) {
    let sponsorIndex = description.indexOf('Спонсор');
    if (sponsorIndex !== -1) {
        return description.slice(0, sponsorIndex);
    } else {
        return description;
    }
}

export function getCurrentPlayerString(player) {
    if (!player || player === '' || player === 1) return 'стандартный'

    if (+player === 2) return 'Kodik'

    console.log('pl', player)
    return 'стандартный'
}

export function removeDuplicatesByTitleOrig(jsonArray) {
    const uniqueObjects = [];
    const uniqueTitles = new Set();

    for (const obj of jsonArray) {
        const titleOrig = obj.title_orig;
        if (!uniqueTitles.has(titleOrig)) {
            uniqueObjects.push(obj);
            uniqueTitles.add(titleOrig);
        }
    }

    return uniqueObjects;
}