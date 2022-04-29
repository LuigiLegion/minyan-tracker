// Imports
const firebaseConfig = require('../config/firebaseConfig');
require('firebase/firestore');
const { parashot } = require('../data/parashot');


// Initializations
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
