export function calcEpisodeDone(now, duration) {
    if (now && duration) {
        const percentWatched = (now / duration) * 100;

        if (percentWatched > 75) return true;
    }

    return false;
}