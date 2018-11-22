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


async function paperSearch(keyword){
    var index = await indexProducer(keyword);
    //alert(index);
    var results = await indexToMetadata(index);
    //alert(results);
    return results;
  }

async function indexProducer(keyword){
  //document.getElementById("text").innerHTML = '';
  var text = keyword.toLowerCase()
  var textarray = text.split(/[\s]/);
  var idx = [];

  function indexMerge(snapshot){
    var result =  snapshot.val();
    if(typeof result == 'null'){
      return;
    }
    idx = idx.concat(result);
  }

  for (var i=0;i<textarray.length;i++){
      var Refauthor = database.ref('metadata/author/' + textarray[i]);
      var Refauthor = await Refauthor.once('value');
      indexMerge(Refauthor);

      var Refinstitution = database.ref('metadata/institution/' + textarray[i]);
      var Refinstitution = await Refinstitution.once('value');
      indexMerge(Refinstitution);

      var Reftitle = database.ref('metadata/title/' +textarray[i]);
      var Reftitle = await Reftitle.once('value');
      indexMerge(Reftitle);

      var Reftext = database.ref('metadata/textWords/' +textarray[i]);
      var Reftext = await Reftext.once('value');
      indexMerge(Reftext);
  }

  idx = unique(idx);
  return idx;
}

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1 && typeof current === "number") {
            res.push(current)
        }
    }
    return res;
}

async function indexToMetadata(idx){
    var results = []
    for (var i=0;i<idx.length;i++){
        var ref = database.ref('metadata/id/' + idx[i]);
        ref = await ref.once('value');
        ref = ref.val()
        results.push(ref);
    }
    return results
}
