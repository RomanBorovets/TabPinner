// function getTabPinnerList(){
//   // var tabPinnerlist = chrome.storage.sync.get({ tabPinnerList: []}, function (result) {
//   //   var tabPinnerlist = result; 
//   // });
//   var tabPinnerList;
//   chrome.storage.sync.get({tabPinnerList: []}, function(result){
//     window.tabPinnerList = result;
//     // return result;
//   });

//   console.log(tabPinnerList);

//   // return tabPinnerlist;
// }

function createTabListElement(icon, url){
  let tabListElement = document.createElement('li');
  tabListElement.classList.add("singleTab");

  let closeBtn = document.createElement('div');
  closeBtn.classList.add('removeTab');

  let closeBtnText = document.createTextNode("⨯");
  
  closeBtn.appendChild(closeBtnText);
  closeBtn.setAttribute('title', 'Revome tab');
  closeBtn.setAttribute('data-remove', url);

  let faviconImg = document.createElement('img');
  faviconImg.setAttribute('src', icon);

  let tabFavicon = document.createElement('div');
  tabFavicon.classList.add('faviconTab');

  tabFavicon.appendChild(faviconImg);

  let linkTab = document.createElement('a');
  linkTab.setAttribute('href', url);
  linkTab.setAttribute('target', '_blank');

  let linkTabText = document.createTextNode(url);

  linkTab.appendChild(linkTabText);

  let titleTab = document.createElement('div');
  titleTab.classList.add('titleTab');
  titleTab.setAttribute('title', url);

  titleTab.appendChild(linkTab);

  tabListElement.appendChild(closeBtn);
  tabListElement.appendChild(tabFavicon);
  tabListElement.appendChild(titleTab);

  return tabListElement;
}

function createTabPinnerList(){

  chrome.storage.sync.get({tabPinnerList: []}, function(result){
    console.log(result.tabPinnerList);
    for(let i = 0; i < result.tabPinnerList.length; i++){
      let newTab = createTabListElement(result.tabPinnerList[i].favicon, result.tabPinnerList[i].url);
      document.querySelector('.tabsList ul').prepend(newTab);
    }
    
  });

}