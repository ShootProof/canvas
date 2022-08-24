export function createCanvas(): HTMLCanvasElement {
  return document.createElement('canvas');
}

export function createImage(): HTMLImageElement {
  return new Image();
}

const Module = {
  createCanvas,
  createImage,
};

export default Module;
