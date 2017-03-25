# Google Chrome Ipcam Viewer Extension

[Google Chrome](https://www.google.de/chrome/browser/desktop/) IP-Camera Viewer Extension

![ipcamviewer](https://github.com/firsttris/chrome.ipcamviewer/raw/master/src/img/Screenshoot1.png)

## Features

* Stream any JPEG Source
* Multiview
* Fullscreen
* Export / Import JSON File

## JPEG Source Examples

- 4XEM
    - http://20.1.0.99/cgi-bin/video.jpg
- 7LINK
    - http://20.1.0.99/cgi/mjpg/mjpeg.cgi
- ABS
    - http://20.1.0.99/mjpg/1/video.mjpg
- AIRLINK    
    - http://20.1.0.99/cgi/mjpg/mjpg.cgi
    - http://20.1.0.99/cgi/jpg/image.cgi
- INSTAR 
    - http://20.1.0.99:80/tmpfs/snap.jpg
- AXIS: 
    - http://20.1.0.99:80/axis-cgi/jpg/image.cgi
    - http://20.1.0.99/axis-cgi/mjpg/video.cgi

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