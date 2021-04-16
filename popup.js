injectTableButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectTable,
  });
});
function injectTable() {
  let cardList = document.getElementsByClassName("CardView_img__3yNPg");
  let dataTable = document.getElementsByClassName("StakeCardList_stakeCardList__32pmZ")[0]
  let table = document.createElement('table');
  table.classList.add("extTable");
  let cardDataArray = []
  for (let i = 0; i < cardList.length; i++) {
    cardName = cardList[i].alt;
    aetherValue = dataTable.childNodes[i].children[0].innerText;
    cardData = [cardName, parseFloat(parseFloat(aetherValue).toFixed(1))];
    cardDataArray.push(cardData);
    console.log(cardDataArray);
  }
  var structuredData = [];
  for(var i=0; i < cardDataArray.length;i++){
    if(structuredData[cardDataArray[i][0]] == undefined) {
      structuredData[cardDataArray[i][0]] = cardDataArray[i];
      structuredData[cardDataArray[i][0]][2] = cardDataArray[i][1];
      structuredData[cardDataArray[i][0]][3] = 1;
    }
    else {
      sumResult = structuredData[cardDataArray[i][0]][1] + cardDataArray[i][1];
      console.log(sumResult);
      structuredData[cardDataArray[i][0]][1] = structuredData[cardDataArray[i][0]][1] + cardDataArray[i][1];
      structuredData[cardDataArray[i][0]][3]++;
    }
  }
document.querySelectorAll('.CardView_card__2mypj').forEach(e => e.remove());
  dataTable.appendChild(table);
  let th1 = document.createElement('th');
  let th2 = document.createElement('th');
  let th3 = document.createElement('th');
  table.appendChild(th1);
  table.appendChild(th2);
  table.appendChild(th3);
  th1.innerHTML = "Card Count"
  th2.innerHTML = "Card Name"
  th3.innerHTML = "Aether/hr"
    for (let i = 0; i < Object.values(structuredData).length; i++) {
      // debugger;
        structuredData = Object.values(structuredData).sort()
        console.log(Object.values(structuredData)[i][0]); //second console output
        let row = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        col1.style.color = "#ffc700";
        col3.style.color = "#f076db";
        col1.style.padding = "10px";
        col2.style.padding = "10px";
        col3.style.padding = "10px";
        row.style.borderBottom = "1px solid #000";
        row.style.boxShadow = "0 0 9px rgb(48 181 255 / 20%)";
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        col1.innerHTML = parseFloat(Object.values(structuredData)[i][3]);
        col2.innerHTML = Object.values(structuredData)[i][0];
        col3.innerHTML = parseFloat(Object.values(structuredData)[i][1]).toFixed(1);
        table.appendChild(row);
    }
}