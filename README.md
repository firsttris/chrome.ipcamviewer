# Google Chrome Ipcam Viewer Extension

[Google Chrome](https://www.google.de/chrome/browser/desktop/) IP-Camera Viewer Extension

![ipcamviewer](https://github.com/firsttris/chrome.ipcamviewer/raw/master/src/img/Screenshoot1.png)

## Features

* Stream JPEG Camera Sources Source
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

### Open Issues
MJPEG does not work performant with XML-HTTP-Requests.
Render with Img Tag and Credentials in URL is not possible in Chrome.
Played arround with [mjpeg-readale-stream](https://github.com/aruntj/mjpeg-readable-stream/blob/master/index.html) implementation, but was not peformant enough.

#### Chrome-Extension Stack
- [Webpack](https://webpack.github.io/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
