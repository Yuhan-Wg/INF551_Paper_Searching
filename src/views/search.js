//<script src="https://www.gstatic.com/firebasejs/5.5.3/firebase.js"></script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCY2-VjMF7IWAqIW2B28Bkqe4CcnvN0wUo",
    authDomain: "inf551-project-f33cc.firebaseapp.com",
    databaseURL: "https://inf551-project-f33cc.firebaseio.com",
    projectId: "inf551-project-f33cc",
    storageBucket: "inf551-project-f33cc.appspot.com",
    messagingSenderId: "563076659205"
};
firebase.initializeApp(config);
var database = firebase.database();


function Search(snapshot){
  var result =  snapshot.val();
  idx = idx.concat(result);
}

function metadata(snapshot){
    idx = unique(idx);
    for (var i=0;i<idx.length;i++){
        var ref = database.ref('metadata/id/' + idx[i]);
        ref.on('value', metadataSearch);
    }
}

function metadataSearch(snapshot){
    //idx = JSON.stringify(result)
    var result = snapshot.val();
    var description_ = {};
    description_['title'] = result['title'];
    if (result['text'].length > 100){
      description_['description'] = result['text'].substring(0,100) + '...';
    }
    else{
      description_['description'] = result['text'];
    }
    results.push(description_);
    //document.getElementById("text").innerHTML += result['title'] + '<br>';
}

function search(text){
    //var year = document.getElementById("year").innerHTML
    //var text = document.getElementById("author").value.toLowerCase()
    var text = text.toLowerCase()
    var textarray = text.split(/[\s]/);
    //var category = document.getElementById("author").innerHTML
    var idx = [];
    var results = [];
    for (var i=0;i<textarray.length;i++){
        var Refauthor = database.ref('metadata/author/' + textarray[i]);
        var Refinstitution = database.ref('metadata/institution/' + textarray[i]);
        var Reftext = database.ref('metadata/textWords/' +textarray[i]);
        var Reftitle = database.ref('metadata/title/' +textarray[i]);
        Refauthor.on('value', Search);
        Refinstitution.on('value', Search);
        Reftext.on('value', Search);
        Reftitle.on('value', Search);
  }
    Reftitle.on('value', metadata);
    return results;
}


function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}
