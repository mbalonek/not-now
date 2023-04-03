class Item{
  constructor(id, text, category){
    this.id=id;
    this.text=text;
    this.category=category;
  }
}

chrome.runtime.onInstalled.addListener(()=> {
  chrome.contextMenus.create({
    id:'to read',
    title: 'read later',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id:'to watch',
    title: 'watch later',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'to listen to',
    title: 'listen to later',
    contexts: ['selection']
    
  });

  chrome.contextMenus.create({
    id: 'to eat',
    title: 'eat later',
    contexts: ['selection'],
    
  });

  chrome.contextMenus.create({
    id: 'to do',
    title: 'do later',
    contexts: ['selection'], 
    
  });
});


chrome.contextMenus.onClicked.addListener(function(info) {
  let selectedList = info.menuItemId;
  
  chrome.storage.local.get({[selectedList]:[]}, function(results) {
      
      let id = results[selectedList].length;
      
      let item = new Item(id, info.selectionText, selectedList);
      results[selectedList].push(item);

      chrome.storage.local.set({[selectedList]: results[selectedList]}, ()=>{      
      });
    
      console.log('Item \"'+ item.text + '\" added to the category '+ item.category);
      
  }); 
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.msg);
});