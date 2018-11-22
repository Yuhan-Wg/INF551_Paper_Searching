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


async function paperSearch(keyword,limit,logic1, logic2){
  //var limit = new Array();
  //limit['year'] = ['2010','2014']
  //var logic1 = 'or'
  //var logic2 = 'or'
  var index = await indexProducer(keyword,limit,logic1, logic2);
  var results = await indexToMetadata(index);
  //alert(results);
  return results;
  }

  async function indexProducer(keyword,limit,logic1, logic2){
    document.getElementById("text").innerHTML = '';
    var text = document.getElementById("input").value.toLowerCase()
    var textarray = text.split(/[\s]/);
    var idx = [];

    function indexMerge(snapshot){
      var result =  snapshot.val();
      if(typeof result == 'null'){
        return [];
      }
      return result
    }

    // limitation
    if( limit !== null){
      idx_limit = []
      for (var key in limit){
        for(var i=0;i<limit[key].length;i++){
          var RefLimit = database.ref('metadata/' + key + '/' + limit[key][i]);
          var RefLimit = await RefLimit.once('value');
          idx_limit_r = indexMerge(RefLimit)
          if(logic2 == 'and'){
            idx_limit.push(idx_limit_r)
          }
          else if(logic2 == 'or'){
            idx_limit = idx_limit.concat(idx_limit_r)
          }
        }
      }
      if(logic2 =='and'){
        idx_limit[0] = idx_limit[0].filter(v => typeof(v)==='number')
        idx_limit = idx_limit.reduce(function(a,b){
          return a.filter(v => b.includes(v))
        })
      }
      else if(logic2 =='or'){
        idx_limit = unique(idx_limit)
      }
      if(text == ''){
        return idx_limit
      }
    }
    else if(limit === null && text==''){
      for(var i=0;i<10;i++){
        idx.push(Math.ceil(Math.random()*3954))
      }
      return idx
    }

    for (var i=0;i<textarray.length;i++){
        idx_r = []
        var Refauthor = database.ref('metadata/author/' + textarray[i]);
        var Refauthor = await Refauthor.once('value');
        idx_r = idx_r.concat(indexMerge(Refauthor));

        var Refinstitution = database.ref('metadata/institution/' + textarray[i]);
        var Refinstitution = await Refinstitution.once('value');
        idx_r = idx_r.concat(indexMerge(Refinstitution));

        var Reftitle = database.ref('metadata/title/' +textarray[i]);
        var Reftitle = await Reftitle.once('value');
        idx_r = idx_r.concat(indexMerge(Reftitle));

        var Reftext = database.ref('metadata/textWords/' +textarray[i]);
        var Reftext = await Reftext.once('value');
        idx_r = idx_r.concat(indexMerge(Reftext));

        if(logic1 == 'and'){
          idx.push(idx_r)
        }
        else if(logic1 == 'or'){
          idx = idx.concat(idx_r)
        }
    }
    if(logic1 == 'and'){
      idx[0] = idx[0].filter(v => typeof(v)==='number')
      idx = idx.reduce(function(a,b){
        return a.filter(v => b.includes(v))
      })
    }
    else if(logic1 == 'or'){
      idx = uniquesort(idx);
    }


    //idx = idx.filter(function(v){
    //  return dx_limit.includes(v)
    //});
    //alert(typeof(idx[0]))
    //alert(typeof(idx_limit[0]))
    if( limit !== null){
      idx = idx.filter(v => idx_limit.includes(v))
    }
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

  function uniquesort(array) {
    var arr = [];
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
      if(typeof(array[i]) !== 'number'){
        continue;
      }
      else if(arr.hasOwnProperty(array[i])){
        arr[array[i]] += 1
      }
      else{
        arr[array[i]] = 1
      }
    }
    for(var v in arr){
      res.push([v, arr[v]])
    }
    res = res.sort(function(a,b){
        return b[1] - a[1]
    })
    res = res.map(function(a){
      return parseInt(a[0])
    })
    return res;
  }

  async function indexToMetadata(idx){
      var results = []
      for (var i=0;i<idx.length;i++){
          var ref = database.ref('metadata/id/' + idx[i]);
          ref = await ref.once('value');
          ref = metadataSearch(ref)
          results.push(ref);
      }
      return results
  }

function metadataSearch(snapshot){
    //idx = JSON.stringify(result)
    var result = snapshot.val();
    if (result['text'].length > 300){
    content= result['text'].substring(0,300) + '...';
    }
    else{
      content = result['text'];
    }
    if (! result['author']){
      author = "Anonymous";
    }
    else{
      author = ""
      for (var i=0;i<result['author'].length;i++){
        author += result['author'][i] + ", "
      }
      if (author.length > 50){
      author= author.substring(0,50) + '...';
      }
    }
    return result;
}
