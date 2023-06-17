this.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  this.skipWaiting();
});

this.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

this.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  this.registration.showNotification(notificationTitle, notificationOptions);
});
