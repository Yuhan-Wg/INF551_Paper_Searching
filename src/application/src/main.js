var config = {
    apiKey: "AIzaSyBdwhg5-uDbH68KK9q3rNwN2rSpxceOVRA",
    authDomain: "xx-net-7281181-1.firebaseapp.com",
    databaseURL: "https://xx-net-7281181-1.firebaseio.com",
    projectId: "xx-net-7281181-1",
    storageBucket: "xx-net-7281181-1.appspot.com",
    messagingSenderId: "16596431567"
};
var firebase = require("firebase");
firebase.initializeApp(config);
var database = firebase.database();
var addNewUser = {
    writeUserData:function(userId, name, email, imageUrl){
        database.ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    },
};
export default addNewUser;