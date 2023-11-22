chrome.storage.sync.get(['connections'], result => {
    if (result && result.connections) {
      localStorage.setItem('connections', JSON.stringify(result.connections));
    } else {
      const connectionsString = localStorage.getItem('connections');
      if (!connectionsString) {
        localStorage.setItem('connections', JSON.stringify([]));
      }
    }
  });