import Canvas from './Canvas.node';
import Image from './Image.node';

export function createCanvas(): HTMLCanvasElement {
  return new Canvas();
}

export function createImage(): HTMLImageElement {
  return new Image();
}

const Module = {
  createCanvas,
  createImage,
};

export default Module;
