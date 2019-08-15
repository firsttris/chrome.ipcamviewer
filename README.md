# Google Chrome Ipcam Viewer Extension

[Google Chrome](https://www.google.de/chrome/browser/desktop/) IP-Camera Viewer Extension

![ipcamviewer](https://github.com/firsttris/chrome.ipcamviewer/raw/master/src/img/Screenshoot1.png)

## Features

* Stream JPEG Camera Sources Source
* [Camera-Presets](https://github.com/firsttris/chrome.ipcamviewer/blob/master/src/data/cameraModels.json)
* Multiview
* Fullscreen
* Export / Import JSON File

## My Camera is not listed in the Presets?

Add your Camera to [src/data/cameraModels.json](https://github.com/firsttris/chrome.ipcamviewer/blob/master/src/data/cameraModels.json) and create a pull-request.

I will publish a new version with your camera model.

## Generic Mode

When creating a new camera, don't select any model, simply enter your stream address.

## Install

[Go to Chrome Webstore](https://chrome.google.com/webstore/detail/ipcam-viewer/jjfknbejnpjndceceeefmofphphjiamb)

## Development & Contribution

1. Clone
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`
3. Run `yarn`
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder

## MJPEG Support dropped

Render an MJPEG Stream or JPEG's in a HTML < img > tag with the credentials in the Stream URL is not possible due to Chrome security polices.
My first approach was to use chrome.webrequest.onBeforeSendHeaders() to add the credentials to the authorization header of the HTTP request.
I think this is not the best approach since you need to filter the requests of the addon (cameras) from all request the browser made.
This requires the permission "browsingData" (be able to see all requests from the browser) which does no comply with data protection guidelines.
So we have to use XML-HTTP-Requests (fetch) to be able to add credentials to the header.
The only implementation i found was [mjpeg-readale-stream](https://github.com/aruntj/mjpeg-readable-stream/blob/master/index.html).
But it was not peformant enough for daily use.
Their is very little information on how to fetch a mjpeg-readable stream and render it to an < img > tag.

If you can help me with this topic, dont hesitate to contact me.

#### Chrome-Extension Stack
- [Webpack](https://webpack.github.io/)
- [VueJs](https://github.com/vuejs/vue)
- [Bootstraps](https://github.com/twbs/bootstrap)

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
