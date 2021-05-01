import Student from './student';

String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}


Array.prototype.inArray = function(comparer){
    for(let i = 0; i < this.length;i++){
        if(comparer(this[i])) return true;
    }
    return false;
}

Array.prototype.pushIfNotExist = function(element,comparer){
    if(!this.inArray(comparer)){
        this.push(element); 
    }
}
