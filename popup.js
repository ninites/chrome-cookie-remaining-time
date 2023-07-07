function updateTimer() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.cookies.get({ url: tabs[0].url, name: 'your_cookie_name' }, function (cookie) {
        if (cookie) {
          var expirationDate = new Date(cookie.expirationDate * 1000);
          var now = new Date();
  
          var timeRemaining = Math.ceil((expirationDate - now) / 1000);
  
          if (timeRemaining <= 0) {
            document.getElementById('timer').textContent = 'Cookie expired';
          } else {
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = timeRemaining % 60;
  
            document.getElementById('timer').textContent = 'Time remaining: ' + minutes + ' minutes ' + seconds + ' seconds';
          }
        } else {
          document.getElementById('timer').textContent = 'Cookie not found';
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    updateTimer();
    setInterval(updateTimer, 1000);
  });
  