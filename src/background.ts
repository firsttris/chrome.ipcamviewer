chrome.browserAction.onClicked.addListener(() => {
    const optionsUrl = chrome.extension.getURL('') + '*';
    chrome.tabs.query({ url: optionsUrl }, tabs => {
      if (tabs.length) {
        tabs.forEach(tab => {
          console.log(tab);
          if(tab.id) {
            chrome.tabs.remove(tab.id);
          }
        });
      }
      chrome.tabs.create({ url: chrome.extension.getURL('multiview.html') }, () => {});
    });
  });