
const keys = ['to read', 'to watch', 'to listen to', 'to eat', 'to do'];

function getMemo(){
  keys.forEach(collection => {
    chrome.storage.local.get({[collection]:[]}, function(results) {
      
      updateMemoes(results[collection], collection);
      
    });
  });
}


function updateMemoes(collection, name){
  
  let root = document.getElementById('memo');
  
  let collectionName = document.createElement('button');
  collectionName.setAttribute('class', 'toggle');
  collectionName.setAttribute('content','text');
  collectionName.addEventListener('click', () => {
    
  collectionName.classList.toggle("active");
    
    let content = collectionName.nextElementSibling;
    
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    }else{
      content.style.maxHeight = content.scrollHeight + "px";
    } 
    
  });
  
  collectionName.innerHTML = name.slice(3).toUpperCase();
  root.append(collectionName);

  let itemsContainer = document.createElement('div');
  itemsContainer.setAttribute('class', 'items');
  root.append(itemsContainer);

  if(Array.isArray(collection) && collection.length !== 0){
    collection.forEach( (item) => {
      
        let content = document.createElement('div');
        content.setAttribute('class', 'content');

        let deleteItem = document.createElement('button');
        deleteItem.setAttribute('class', 'del_btn');
        deleteItem.setAttribute('content','text');
        deleteItem.innerHTML = 'x'; 
 
        let itemText = document.createElement('ul');
        itemText.setAttribute('class', 'item');
        itemText.setAttribute('content','text');
        itemText.innerHTML = item.text;

        deleteItem.id=item.category;
        deleteItem.name=item.id;

        deleteItem.onclick = (ev) => {
            chrome.storage.local.get([ev.target.id], (results) => {
            loadedList = results[ev.target.id] || [];
            
            let updatedList = loadedList.filter(itm => itm.id!=ev.target.name);
            chrome.storage.local.set({[ev.target.id] : updatedList});
            sendLog("List  \""+ name + "\" was updated");
            window.location.reload();
            sendLog("Popup page reloaded..");
      
          });
         
        };
    
        content.append(itemText);
        content.append(deleteItem);
        itemsContainer.append(content);

      });   
    }
};

getMemo();

function sendLog(message) {
    chrome.runtime.sendMessage({msg: message});
}
