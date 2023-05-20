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

export function removeDescAd() {
    // TODO
}


export function getCurrentPlayerString(player) {
    if (!player || player === '' || player === 1) return 'стандартный'

    if (+player === 2) return 'Kodik'

    console.log('pl', player)
    return 'стандартный'
}