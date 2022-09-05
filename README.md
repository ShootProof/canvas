# @foreground/canvas

This repository provides a canvas implementation that works on the browser and node, leveraging the [canvas](https://www.npmjs.com/package/canvas) package.

It replaces `document.createElement('canvas')` and `new Image()` with `createCanvas()` and `createImage()`, respectively.

## Installation

```bash
$ npm install @foreground/canvas
```

By default, binaries for macOS, Linux and Windows will be downloaded. If you want to build from source, use `npm install --build-from-source` and see the **Compiling** section below.

The minimum version of Node.js required is **6.0.0**.

### Compiling

If you don't have a supported OS or processor architecture the module will be compiled on your system. This requires several dependencies, including Cairo and Pango.

For detailed installation information, see the canvas package [wiki](https://github.com/Automattic/node-canvas/wiki/_pages). One-line installation instructions for common OSes are below.

| OS      | Command                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| OS X    | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman` |
| Ubuntu  | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`        |
| Fedora  | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`                             |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`                                     |
| OpenBSD | `doas pkg_add cairo pango png jpeg giflib`                                                                      |
| Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)                            |
| Others  | See the [wiki](https://github.com/Automattic/node-canvas/wiki)                                                  |

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072).
If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

## Usage example

The following code can be used in node and in the browser.

```typescript
import { createCanvas, createImage } from "@foreground/canvas";

const canvas = createCanvas();

canvas.width = 100;
canvas.height = 100;

const context = canvas.getContext("2d");

if (context) {
  context.fillStyle = "red";
  context.fillRect(25, 25, 50, 50);

  const image = createImage();

  new Promise<void>((resolve) => {
    image.crossOrigin = "anonymous";
    image.addEventListener("load", () => resolve());
    image.src = url;
  }).then(() => {
    context.drawImage(image, 0, 0, 100, 100);
  });
}
```
