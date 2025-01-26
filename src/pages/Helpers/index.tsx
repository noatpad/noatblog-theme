import { Fragment } from "preact";
import { useEffect } from "preact/hooks";
import MusicRecMaker from "./MusicRecMaker";
import './style.scss';

const Helpers = () => {
  useEffect(() => { document.body.className = 'post now'; }, []);

  return (
    <Fragment>
      <h1>Noatblog helpers!</h1>
      <MusicRecMaker />
    </Fragment>
  );
};

export default Helpers;
