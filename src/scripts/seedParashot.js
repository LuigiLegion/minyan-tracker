// Imports
const firebase = require('firebase/app');
require('firebase/firestore');
const firebaseConfig = require('../config/firebaseConfig.json');
const { parashot } = require('../data/parashot.json');

// Initializations
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const seedCollection = async (collectionName, documentName, dataset) => {
  try {
    await firestore
      .collection(collectionName)
      .doc(documentName)
      .set({
        count: 0,
        [documentName]: dataset,
      });

    console.log('Document added successfully!');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

seedCollection('parashot', 'parashot', parashot);
