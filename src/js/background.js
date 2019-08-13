chrome.browserAction.onClicked.addListener(() => {
  const optionsUrl = chrome.extension.getURL('') + '*';
  chrome.tabs.query({ url: optionsUrl }, tabs => {
    if (tabs.length) {
      tabs.forEach(tab => {
        console.log(tab);
        chrome.tabs.remove(tab.id);
      });
    }
    chrome.tabs.create({ url: chrome.extension.getURL('popup.html#/multiview') }, () => {});
  });
});
