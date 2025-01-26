const AM_ART_API = 'https://clients.dodoapps.io/playlist-precis/playlist-artwork.php';

const musicForm = document.querySelector('#musicForm') as HTMLFormElement;
const musicRec = document.querySelector('.music-rec') as HTMLDivElement;
const emptyTrackFields = musicForm.querySelector('.track')!.cloneNode(true) as HTMLDivElement;
const addTrackBtn = musicForm.querySelector('#add-track') as HTMLButtonElement;
const removeTrackBtn = musicForm.querySelector('#remove-track') as HTMLButtonElement;
const copyMusicRecBtn = document.querySelector('#copy-music-rec') as HTMLButtonElement;

const countTracks = (): number => document.querySelectorAll('.track').length;

const getAppleArt = async (url: string): Promise<string> => {
  const data = new FormData();
  data.append('url', url);

  try {
    const resp = await fetch(AM_ART_API, { method: 'POST', body: data });
    if (!resp.ok) throw new Error(`Error: ${resp.status}`);

    const { thumb } = await resp.json();
    return thumb;
  } catch (err) {
    console.error(err);
    return url;
  }
}

addTrackBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const track = emptyTrackFields.cloneNode(true) as HTMLDivElement;
  document.querySelector('.fav-tracks .tracks')?.insertAdjacentElement('beforeend', track);

  const index = countTracks();
  const fields = track.querySelectorAll('input');
  fields[0].name = `track${index}`;
  fields[1].name = `trackLink${index}`;

  removeTrackBtn.disabled = false;
});

removeTrackBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.fav-tracks .tracks .track:last-child')?.remove();
  removeTrackBtn.disabled = countTracks() <= 1;
});


musicForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(musicForm);
  const url = data.get('url') as string;
  if (new URL(url).host === 'music.apple.com')
    data.set('url', await getAppleArt(url));

  const albumArt = musicRec.querySelector('.album-art') as HTMLImageElement;
  albumArt.src = data.get('url') as string;

  const info = musicRec.querySelector('.album-info') as HTMLHeadingElement;
  info.innerText = data.get('album') as string;

  if (data.get('artist')) {
    const small = document.createElement('small');
    small.innerText = ` by ${data.get('artist')}`;
    info.append(small);
  }

  const tracks = musicRec.querySelector('.favorite-tracks') as HTMLUListElement;
  const count = countTracks();
  tracks.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const nameField = `track${i}`;
    const linkField = `trackLink${i}`;
    const li = document.createElement('li');
    if (data.get(linkField)) {
      const a = document.createElement('a');
      a.innerText = data.get(nameField) as string;
      a.href = data.get(linkField) as string;
      a.target = '_blank';
      li.append(a);
    } else {
      li.innerText = data.get(nameField) as string;
    }
    tracks.append(li);
  }

  musicRec.removeAttribute('style');
});

copyMusicRecBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const html = musicRec.outerHTML
    .split('\n')
    .map(line => line.trim())
    .join('\n');
  navigator.clipboard.writeText(html);
});
