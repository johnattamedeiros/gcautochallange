chrome.runtime.onMessage.addListener(config => {

  let onlyPrime = config.onlyPrime;
  let maxLevel = config.maxLevel;
  let minLevel = config.minLevel;
  let maxKDR = config.maxKDR;
  console.log("INITIALIZING ....");

  let rooms = document.getElementsByClassName("lobby-room-list-item sala-card-wrapper");
  let countPrime = [];
  let averageLevel = [];
  let countKDRAccepted = [];
  let roomsToChallenge = [];
  let roomSize = 5;
  console.log("Find room min level : " + minLevel);
  console.log("Find room max level : " + maxLevel);
  console.log("Find in : " + rooms.length + " rooms");
  for (var roomIndex = 0; roomIndex < rooms.length; roomIndex = roomIndex + 1) {
    countPlayersRoom = rooms[roomIndex].getElementsByClassName("sala-lineup-level");
    if (parseInt(countPlayersRoom.length) == parseInt(roomSize)) {
      let players = rooms[roomIndex].getElementsByClassName("sala-lineup-player");
      countPrime[roomIndex] = 0;
      averageLevel[roomIndex] = 0;
      countKDRAccepted[roomIndex] = 0;

      for (var playerIndex = 0; playerIndex < players.length; playerIndex = playerIndex + 1) {
        let playerPrime = players[playerIndex].getElementsByClassName("is-prime true");
        if (playerPrime.length > 0) {
          countPrime[roomIndex] = countPrime[roomIndex] + 1;
        }

        let playersKdrDiv = players[playerIndex].getElementsByClassName("gcc-kdr")[0];
        let playerKdr = parseFloat(playersKdrDiv.innerText);
        if(playerKdr < parseFloat(maxKDR)){
          countKDRAccepted[roomIndex] = countKDRAccepted[roomIndex] + 1;
        }
        
        let playerLevelDiv = players[playerIndex].getElementsByClassName("sala-lineup-level");
        let playerLevel;
        for (var playerLevelDivIndex = 0; playerLevelDivIndex < playerLevelDiv.length; playerLevelDivIndex = playerLevelDivIndex + 1) {
          let levelSpanPrime = playerLevelDiv[playerLevelDivIndex].getElementsByClassName("badge-level-value")[0];
          if (levelSpanPrime) {
            levelSpan = levelSpanPrime;
          } else {
            levelSpan = playerLevelDiv[playerLevelDivIndex].getElementsByClassName("badge-level")[0];
          }
          playerLevel = levelSpan.innerText;
        }
        if (parseInt(playerLevel) >= parseInt(minLevel) && parseInt(playerLevel) <= parseInt(maxLevel)) {
          averageLevel[roomIndex] = averageLevel[roomIndex] + 1;
        }
      }
      if (onlyPrime) {
        if (countPrime[roomIndex] === roomSize) {
          if (averageLevel[roomIndex] === roomSize) {
            if (countKDRAccepted[roomIndex] === roomSize) {
              roomsToChallenge.push(rooms[roomIndex]);
            }
          }
        }
      } else {
        if (averageLevel[roomIndex] === roomSize) {
          if (countKDRAccepted[roomIndex] === roomSize) {
              roomsToChallenge.push(rooms[roomIndex]);
          }
        }
      }
    }
  }
  console.log("\rDefying  " + roomsToChallenge.length + " rooms ");
  for (var roomsToChallengeIndex = 0; roomsToChallengeIndex < roomsToChallenge.length; roomsToChallengeIndex = roomsToChallengeIndex + 1) {
    defyingButton = roomsToChallenge[roomsToChallengeIndex].querySelector('.lobby-btn-play-big');
    //defyingButton.click();
  }

});


