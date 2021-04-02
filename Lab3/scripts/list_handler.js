"use strict";
const addToList = () => {
    let counter = 0;
    const itemName = document.getElementById("item-text").value;
    if(!itemName){
        return;
    }
    const listId = document.getElementById("list-selector").value;

    const list = document.getElementById(listId);
    const listItem = document.createElement("li");
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class","row");
    
    const itemText = document.createElement("div");
    itemText.setAttribute("onclick","completeItem(this)")
    itemText.setAttribute("class","col-lg-9")
    itemText.appendChild(document.createTextNode(itemName));

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class","remove-item badge badge-danger");
    removeButton.innerHTML = "X";

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(removeButton);
    listItem.appendChild(itemDiv);
    listItem.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
    list.appendChild(listItem);
}

const completeItem = (listItem) => {

    if(listItem.style.textDecoration === "line-through"){
        listItem.style.textDecoration = "none";
        listItem.style.color = "black";
        listItem.parentElement.removeChild(listItem.parentElement.childNodes[2]);
    }else{
        listItem.style.textDecoration = "line-through";
        listItem.style.color = "grey";
        const dateText = document.createElement("div");
        dateText.setAttribute("class", "col-lg-2")
        const date = new Date();
        dateText.innerHTML = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
        dateText.style.color = "black";
        listItem.parentElement.appendChild(dateText);
    }
}

const hideList = (listId) => {
    const list = document.getElementById(listId);
    if(list.style.display === "none"){
        list.style.display = "inline";
    }else{
        list.style.display = "none";
    }
}

const searchList = (searchBox,isSensitiveCheckBoxId,listId) => {
    const isSensitive = document.getElementById(isSensitiveCheckBoxId).checked;
    const search = searchBox.value;
    const list = document.getElementById(listId);
    const listElements = list.childNodes;
    for(let i = 1; i<listElements.length; i++){
        list.childNodes[i].setAttribute('style', 'display:inline !important');
        const text = listElements[i].childNodes[0].childNodes[0].innerHTML;
        let index;
        if(!isSensitive){
            index = text.toLowerCase().search(search.toLowerCase());

        }else{
            index = text.search(search);
        }

        if(index != 0){
            list.childNodes[i].setAttribute('style', 'display:none !important');
        }
    }

}