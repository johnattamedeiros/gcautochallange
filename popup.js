document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('#defy').addEventListener('click', function () {

    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        let onlyPrime = document.getElementById('onlyPrime').checked;
        let maxLevel = document.querySelector('#maxLevel').value;
        let minLevel = document.querySelector('#minLevel').value;
        let config = {};
        config.onlyPrime = onlyPrime;
        config.maxLevel = maxLevel;
        config.minLevel = minLevel;

        chrome.tabs.sendMessage(tab.id, config);
      });
    });
  });

})