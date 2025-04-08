export async function searchSongs(query) {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query,
    )}&media=music`,
  );
  if (!response.ok) {
    return [];
  }
  const data = await response?.json();
  if (data.results.length === 0) {
    return [];
  }
  const songs = data.results.map((song) => ({
    id: `${song.trackId}`,
    title: song.trackName,
    artist: song.artistName,
    cover: song.artworkUrl100,
    preview: song.previewUrl,
  }));

  return songs;
}

export async function populatePlaylist(trackIds) {
  const promises = trackIds.map(async (id, index) => {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&media=music`,
    );
    const data = await response.json();
    if (data.results.length === 0) {
      return null;
    }
    const song = data.results[0];
    return {
      id: `${song.trackId}`,
      title: song.trackName,
      artist: song.artistName,
      cover: song.artworkUrl100,
      preview: song.previewUrl,
      score: index,
    };
  });
  const songs = await Promise.all(promises);
  return songs.filter((song) => song !== null);
}
