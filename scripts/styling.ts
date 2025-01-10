interface Fx { layers: number, charsPerCycle?: number, delayOffset?: number }
interface FxWithVariations extends Fx { variations?: Record<string, Fx> }

const TEXT_EFFECTS: Record<string, FxWithVariations> = {
  bouncy: { layers: 1, charsPerCycle: 5 },
  sway: {
    layers: 2,
    charsPerCycle: 5,
    delayOffset: 0.25,
    variations: {
      fast: { layers: 2, charsPerCycle: 3.5, delayOffset: 0.2 },
      faster: { layers: 2, charsPerCycle: 2.5, delayOffset: 0.15 }
    }
  },
  wavy: { layers: 1, charsPerCycle: 5 },
  shaky: { layers: 1, charsPerCycle: 10 }
}

const createFxSpan = (fx: Fx, char: string, delay: number, cls: string, layer: number): HTMLSpanElement => {
  const s = document.createElement('span');

  s.className = cls;
  if (layer > 1) s.classList.add(`l-${layer}`);

  s.style.animationDelay = `${delay - (layer - 1) * (fx.delayOffset ?? 0.2)}s`;

  if (layer < fx.layers) {
    s.insertAdjacentElement('afterbegin', createFxSpan(fx, char, delay, cls, layer + 1));
  } else {
    s.textContent = char;
  }

  return s;
}

export const styleTitle = () => {
  const h1 = document.querySelector('.title h1')!;
  const span = document.createElement('span');
  span.textContent = h1.textContent!.trim();
  span.classList.add('fx', 'sway', 'subtle', 'slower');
  h1.textContent = '';
  h1.appendChild(span);
};

export const addTextFX = () => {
  const effectNames = Object.keys(TEXT_EFFECTS);
  for (const el of document.querySelectorAll('.fx')) {
    // Get text effect from the span's class, if it exists. Skip otherwise
    const classes = [...el.classList.values()];
    const fxName = classes.find(cls => effectNames.includes(cls));
    if (!fxName) continue;

    let fx = TEXT_EFFECTS[fxName];
    if (!fx) continue;

    el.classList.add('processed');

    // Get variation of text effect if it exists
    if (fx.variations !== undefined) {
      const variationNames = Object.keys(fx.variations);
      const variation = classes.find(cls => variationNames.includes(cls));
      if (variation) {
        fx = { ...fx, ...fx.variations[variation] };
      }
    }

    const { animationDuration } = getComputedStyle(el);
    const text = el.textContent ?? '';
    const interval = parseFloat(animationDuration) / (fx.charsPerCycle ?? 5);

    // Split the span into words, each to be processed
    let overallIndex = 0;
    const startDelay = text.replace(/\s+/g, '').length * -interval;
    const wordSpans = text.split(' ').map((word) => {
      let span = document.createElement('span');

      if (el.classList.contains('together')) {
        // Use the effect per word and sync them in timing
        span = createFxSpan(fx, word, 0, el.className, 1);
      } else {
        // Use the effect per letter and stagger the timing
        span.className = 'text-fx';
        const letters = [...word].map((l, i) => {
          const delay = startDelay + (overallIndex + i) * interval;
          return createFxSpan(fx, l, delay, el.className, 1);
        });
        span.append(...letters);
      }

      overallIndex += word.length;
      return span;
    });

    const spaceSpan = document.createElement('span');
    spaceSpan.textContent = ' ';

    // Replace span with the generated text and its effects
    // Join them with a single-spaced span
    el.textContent = '';
    el.removeAttribute('class');
    const spans = wordSpans.flatMap((s, i, arr) => (i < arr.length - 1 ? [s, spaceSpan.cloneNode(true)] : s));
    el.append(...spans);
  }
};
