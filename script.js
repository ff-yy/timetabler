//時間割のhtml実行時呼び出し

//html呼び出しと同時に各要素にkeyからvalueを当てはめる
loadTable();

//現在のurlの前準備、保存
let urlData = "";
chrome.tabs.getSelected(tab=>{  // 現在のタブを取得
  urlData = tab.url;  // urlDataにURLを保存
});

/**
 * 
 */
function loadTable() {
  //ローカル保存しているすべてのキーを取得
  chrome.storage.local.get(null, function(items) {
    //すべてのキー
    var allKeys = Object.keys(items);
    //ループ
    for (let i = 0; i < allKeys.length; i++) {
      //i番目の要素を取得
      const element = allKeys[i];
      //その要素がtitleのときのみ以下を実行urlのときは次の要素へ
      if (element.indexOf("title") != -1) {
        continue;
      }
      //mon_1の形式
      let day_num = element.substring(0,5);
      //置き換える要素を取得
      let webElement = document.getElementById(day_num);

      //要素のhtmlを置き換え
      let url = items[day_num + "_url"];
      let title = items[day_num + "_title"];
      webElement.innerHTML = '<a href='+ url +' target="_blank">'+ title +'</a>';
      // console.log(element);
      // console.log(items[element]);
    }
  });
}

function saveButtonClick() {
  const key_title = dayListElement.value + "_" + periodListElement.value + "_title";
  const key_url = dayListElement.value + "_" + periodListElement.value + "_url"
  const value_title = inputTextElement.value;
  const value_url = urlData;

  let obj = {};
  obj[key_title] = value_title;
  obj[key_url] = value_url;
  chrome.storage.local.set(obj);

  loadTable();
}


function deleteButtonClick() {
  let day_num = dayListElement.value + "_" + periodListElement.value;
  const key_title = day_num + "_title";
  const key_url = day_num + "_url"
  chrome.storage.local.remove([key_title, key_url], function() {});
  document.getElementById(day_num).innerText = "";
}

let dayListElement = document.getElementById("day");
let periodListElement = document.getElementById("period");
let saveButton = document.getElementById('saveButton');
let deleteButton = document.getElementById('deleteButton');
let inputTextElement = document.getElementById('inputText');

saveButton.addEventListener('click', saveButtonClick);
deleteButton.addEventListener('click', deleteButtonClick);