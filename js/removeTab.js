function removeTab(target){
  target.parentElement.remove();
}

// event listners
var tabsList = document.querySelectorAll('.singleTab .removeTab')

document.addEventListener('click',function(e){
  if(e.target && e.target.className == 'removeTab'){

    chrome.storage.sync.get({tabPinnerList: []}, function(result){
      let updatedTabsList = result.tabPinnerList;
      
      for(let i = 0; i < updatedTabsList.length; i++){
        if(updatedTabsList[i].url == e.target.getAttribute('data-remove')){
          updatedTabsList.splice(i, 1);
          break; 
        }
      }
      
      chrome.storage.sync.set({tabPinnerList: updatedTabsList});
    });

    removeTab(e.target);
   }
});