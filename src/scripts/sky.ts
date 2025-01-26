const STAR_COUNT = 150;
const STAR_SIZES = ['sm', 'md', 'lg'];
const STAR_LUMS = ['bright', 'lum', 'dim'];
const STAR_TIMES = ['quick', 'normal', 'slow', 'no-blink'];
const METEOR_TYPES = ['far', 'mid', 'close', 'near'];

const randFloat = (upTo = 1.0): number => Math.round(Math.random() * upTo * 100) / 100;
const randRange = (min = 0.0, max = 1.0): number => randFloat(max - min) + min;

// Randomly pick an element based on given weights, corresponding to the elements
const weightedPick = <T>(options: T[], weights: number[]): T => {
  const total = weights.reduce((val, t) => t += val);
  const rand = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < options.length; i++) {
    sum += weights[i];
    if (rand < sum) return options[i];
  }
  return options[options.length - 1];
}

// Periodically fire a shooting star
const fireShootingStar = () => {
  const delay = randRange(2000, 8000);
  const start = document.querySelector<HTMLDivElement>('.meteor-start')!;
  const meteor = document.querySelector<HTMLDivElement>('.meteor')!;
  setTimeout(() => {
    start.style.right = `${randRange(0, 60)}%`;
    start.style.top = `${randRange(0, 60)}%`;
    meteor.className = 'meteor';
    meteor.classList.add(weightedPick(METEOR_TYPES, [4, 3, 2, 1]));
    fireShootingStar();
  }, delay);
};

export const lightTheSky = () => {
  // Create the stars...
  const starContainer = document.createElement('div');
  starContainer.classList.add('stars');

  const stars: HTMLSpanElement[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const size = weightedPick(STAR_SIZES, [5, 3, 2]);
    const lum = weightedPick(STAR_LUMS, [5, 3, 2]);
    const blink = weightedPick(STAR_TIMES, [1, 2, 2, 3]);

    const star = document.createElement('span');
    star.classList.add('star', size, lum, blink);
    star.style.top = `${randFloat(100)}%`;
    star.style.left = `${randFloat(100)}%`;
    star.style.animationDelay = `-${randFloat(2)}s`;
    stars.push(star);
  }
  starContainer.append(...stars);

  // Prepare the meteorite...
  const meteorContainer = document.createElement('div');
  meteorContainer.classList.add('meteor-start');
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  meteorContainer.appendChild(meteor);

  // And light up the sky...
  const sky = document.createElement('div');
  sky.classList.add('sky');
  sky.append(starContainer, meteorContainer);

  document.querySelector('body')?.prepend(sky);
  fireShootingStar();
};
