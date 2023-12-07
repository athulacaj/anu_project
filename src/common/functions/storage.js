function saveData(key,data){
    // if data is not an string, convert it to string
    if(typeof data !== 'string'){
        localStorage.setItem(key, JSON.stringify(data));
    }else{
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function loadData(){
    return JSON.parse(localStorage.getItem('data'));
}