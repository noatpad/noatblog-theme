const AM_ART_API = 'https://clients.dodoapps.io/playlist-precis/playlist-artwork.php';

const getAppleArt = async (url: string): Promise<string> => {
  const body = new FormData();
  body.append('url', url);

  try {
    const resp = await fetch(AM_ART_API, { method: 'POST', body });
    if (!resp.ok) throw new Error(`Error: ${resp.status}`);

    const { thumb } = await resp.json();
    return thumb;
  } catch (err) {
    console.error(err);
    return url;
  }
};

export const getArtwork = async (url: string): Promise<string> => {
  return await (new URL(url).host === 'music.apple.com' ? getAppleArt(url) : url);
};
