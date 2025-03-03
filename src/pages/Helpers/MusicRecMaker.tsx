import { useRef, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { getArtwork } from './utils';

interface Track { id: number, track: string, url: string }

const emptyTrack = (): Track => ({ id: Date.now(), track: '', url: '' });

const MusicRecMaker = () => {
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setURL] = useState('');
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const recRef = useRef();

  const updateImageURL = async () => {
    setURL(await getArtwork(url));
  }

  const addTrack = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTracks([...tracks, emptyTrack()]);
  };

  const removeTrack = (e: JSX.TargetedMouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    setTracks(tracks.filter(t => t.id !== id));
  };

  const updateTrack = (id: number, field: string, value: string) => {
    const newTracks = [...tracks];
    const index = tracks.findIndex(t => t.id === id);
    newTracks[index][field] = value;
    setTracks(newTracks);
  };

  const copyHTML = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const html = (recRef.current as HTMLDivElement)
      .outerHTML
      .split('\n')
      .map(line => line.trim())
      .join('\n');
    navigator.clipboard.writeText(html);
  };

  return (
    <div class='music-rec-maker'>
      <h2>Music recommendation generator</h2>
      <div>
        <div class='col'>
          <input
            type='text'
            name='album'
            class='fill'
            required
            placeholder='Album name'
            onInput={(e) => setAlbum(e.currentTarget.value)}
          />
          <input
            type='text'
            name='artist'
            class='fill'
            placeholder='Artist name'
            onInput={(e) => setArtist(e.currentTarget.value)}
          />
        </div>
        <div class='col'>
          <input
            type='url'
            name='url'
            class='fill'
            required
            placeholder='Image/Apple Music URL'
            onInput={(e) => setURL(e.currentTarget.value)}
            onBlur={updateImageURL}
          />
        </div>
        <div class="col center">
          <button onClick={addTrack}>Add track</button>
        </div>
        {tracks.map(({ id, track, url }) => (
          <div className="col">
            <input
              type="text"
              class="fill"
              placeholder='Track'
              required
              value={track}
              onInput={(e) => updateTrack(id, 'track', e.currentTarget.value)}
            />
            <input
              type="text"
              class="fill"
              placeholder='URL'
              value={url}
              onInput={(e) => updateTrack(id, 'url', e.currentTarget.value)}
            />
            <button onClick={(e) => removeTrack(e, id)}>-</button>
          </div>
        ))}
      </div>
      <hr />
      <div className="music-rec-preview">
        <div class="music-rec" ref={recRef}>
          <div className="album-art">
            <img src={url} alt={`Album artwork`} />
          </div>
          <div class="music-info">
            <h3 class="album-info">
              {album}
              {artist && (
                <small> by {artist}</small>
              )}
            </h3>
            <ul class="favorite-tracks">
              {tracks.map(({ track, url }) => (
                <li>
                  {url ? (
                    <a href={url} target="_blank">{track}</a>
                  ) : track}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div class="col">
          <button class="fill" onClick={copyHTML}>Copy HTML</button>
        </div>
      </div>
    </div>
  );
};

export default MusicRecMaker;
