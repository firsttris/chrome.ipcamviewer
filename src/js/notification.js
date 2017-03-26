function createNotification(message) {
  chrome.notifications.create('IpCamViewerNotification', {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'IpCamViewer',
    message: message
  }, () => {
    setTimeout(() => {
      chrome.notifications.clear('IpCamViewerNotification');
    }, 2000);
  });
}
module.exports = {createNotification};
