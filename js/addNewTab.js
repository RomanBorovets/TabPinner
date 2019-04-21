function getCurrentTabUrl(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;

    return url;
  });
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function getFaviconByUrl(url){
  let decodedUrl = new URL(url);
  return 'http://www.google.com/s2/favicons?domain=' + decodedUrl.host;
}

function saveTab(url){
  let newFavicon = getFaviconByUrl(url);
  let newTab = createTabListElement( newFavicon, url);
  chrome.storage.sync.get({tabPinnerList: []}, function(result){
    let updatedTabsList = result.tabPinnerList;
    updatedTabsList.push({
      url: url,
      favicon: newFavicon
    });
    
    chrome.storage.sync.set({tabPinnerList: updatedTabsList});
  });

  document.querySelector('.tabsList ul').prepend(newTab);
}

// event listners
document.querySelector('#addNewTab').addEventListener('click', function(){
  let newTabUrl = document.querySelector('#newTabUrl').value;
  
  if(validURL(newTabUrl)){
    saveTab(newTabUrl);
    document.querySelector('#newTabUrl').value = '';
  }else{
    console.log('invalid url');
  }
});