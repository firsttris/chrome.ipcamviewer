# Google Chrome Ipcam Viewer Extension

[Google Chrome](https://www.google.de/chrome/browser/desktop/) IP-Camera Viewer Extension

![ipcamviewer](https://github.com/firsttris/chrome.ipcamviewer/raw/master/src/img/Screenshoot1.png)

## Features

* Streams MJPEG & JPEG Source
* [Camera-Presets](https://github.com/firsttris/chrome.ipcamviewer/blob/master/src/data/cameraModels.json)
* Multiview
* Fullscreen
* Export / Import JSON File

## Install

[Go to Chrome Webstore](https://chrome.google.com/webstore/detail/ipcam-viewer/jjfknbejnpjndceceeefmofphphjiamb)

## Development

1. Clone
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`
3. Run `yarn`
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder

#### Chrome-Extension Stack
- [Webpack](https://webpack.github.io/)
- [Buble](https://buble.surge.sh/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

#### Sources
I forked this boilerplate from [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)