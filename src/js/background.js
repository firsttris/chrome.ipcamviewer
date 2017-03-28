chrome.browserAction.onClicked.addListener((tab) => {
  const optionsUrl = chrome.extension.getURL('') + '*';
  chrome.tabs.query({url: optionsUrl}, (tabs) => {
    if (tabs.length) {
      tabs.forEach((tab) => {
        console.log(tab);
        chrome.tabs.remove(tab.id);
      });
    }
    chrome.tabs.create({'url': chrome.extension.getURL('popup.html#/multiview')}, (tab) => {
    });
  });
});

const findObjectByPropertyInArray = function (nameKey, myArray) {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].url === nameKey) {
      return myArray[i];
    }
  }
};

const getKeyFromUrl = function (urls) {
  let key;
  if (urls.length === 1) {
    key = urls[0];
  }
  if (urls.length > 1) {
    urls.pop();
    key = urls.join('?');
  }
  return key;
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const connections = JSON.parse(localStorage.getItem('connections'));
    let urls = details.url.split('?');
    let key = getKeyFromUrl(urls);
    const connection = findObjectByPropertyInArray(key, connections);
    if (connection) {
      const basicAuth = {
        name: 'Authorization',
        value: "Basic " + btoa(connection.username + ":" + connection.password)
      };
      details.requestHeaders.push(basicAuth);
      if (connection.cameraType === 'jpg') {
        const noCache = {name: 'Cache-Control', value: "max-age=0, must-revalidate, no-store"};
        details.requestHeaders.push(noCache);
      }
    }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]);