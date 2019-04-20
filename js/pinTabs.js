function getPinnedTabs(){
  chrome.tabs.query({'pinned': true}, function (tabs) {
    return tabs;
  });
}

document.querySelector('#pinTabs').addEventListener('click', function(){
  chrome.tabs.query({'pinned': true}, function (tabs) {
    
    var tabsUrlArr = [];
    for(let i = 0; i < tabs.length; i++){
      tabsUrlArr.push(tabs[i].url);
    }

    chrome.storage.sync.get({tabPinnerList: []}, function(result){

      for(let i = 0; i < result.tabPinnerList.length; i++){
        if(tabsUrlArr.includes(result.tabPinnerList[i].url)){
          console.log(result.tabPinnerList[i].url + ' is pinned');
        }else{
          console.log(result.tabPinnerList[i].url + ' is not pinned');
          chrome.tabs.create({ 
            url: result.tabPinnerList[i].url,
            active: false,
            pinned: true
          });
        }
      }
    });
  });
});