import * as firebase from "firebase/app";
import "firebase/database";
import * as Util from "./util";
import { merge } from "lodash";
// Required for side-effects
require("firebase/firestore");


var firebaseConfig = {
  apiKey: "AIzaSyDi9lQlfe7ignarlq1_cSlFQoXV2swGpBc",
  authDomain: "catwalk-5e2f6.firebaseapp.com",
  databaseURL: "https://catwalk-5e2f6.firebaseio.com/",
  projectId: "catwalk-5e2f6",
  storageBucket: "gs://catwalk-5e2f6.appspot.com",
  messagingSenderId: "470565111413",
  appId: "1:969315329681:web:16a91d5c400d375d320130"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

const firebaseDB = firebase.database();

export const writeHighScoreData = (name, time) => {
  const scoreRef = firebaseDB.ref('highscores/' + Util.randomId());
  return scoreRef.set({name, time});
};

export const retrieveHighScores = (dispatch) => {
  return firebaseDB.ref('highscores/').once('value').then( data => {
    const merged = [];
    data.forEach(el => {
      const obj = {"id": el.key};
      merged.push(merge({}, el.val(), obj));
    });
    dispatch(merged);
  });
};

export const removeHighScore = (id, name, time, dispatch) => {
  const ref = firebaseDB.ref("highscores/" + id);
  return ref
    .remove()
    .then(writeHighScoreData(name, time));
};

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});