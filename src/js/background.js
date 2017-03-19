chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('options.html#/multiview')}, function(tab) {
    // Tab opened.
  });
});