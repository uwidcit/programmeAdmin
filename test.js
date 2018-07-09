const admin = require('firebase-admin');
const functions = require('firebase-functions');
const allProgs = require('./results.json');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
var docRef = db.collection('allProgs').doc('allProgs');

allProgs.forEach(obj => {
    docRef.set(obj);
})





