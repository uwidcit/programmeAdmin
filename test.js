// const admin = require('firebase-admin');
// const functions = require('firebase-functions');
// const allProgs = require('./results.json');

// admin.initializeApp(functions.config().firebase);

// var db = admin.firestore();
// var docRef = db.collection('allProgs').doc('allProgs');

// allProgs.forEach(obj => {
//     docRef.set(obj);
// })

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

var db = admin.firestore();

var docRef = db.collection('allProgs').doc('allProgs');

var setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});