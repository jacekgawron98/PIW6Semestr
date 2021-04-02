"use strict";
$(document).ready(function(){
    let list;
    let trash;

    $(document).on('click', ".remove-item", function(e){
        list = $(this).parent().parent().parent();
        if(confirm("Do you want to remove this item?")){
            const listItem = $(this).parent().parent(); 
            trash = listItem;
            listItem.remove();
        }
    });

    $(document).on('click', "#return", function(e){
        $(list).append(trash);
        trash = null;
    })
});