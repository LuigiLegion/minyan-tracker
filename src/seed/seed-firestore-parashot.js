const firebase = require('../config/fbConfig');
require('firebase/firestore');
const firestore = firebase.firestore();

const { parashot } = require('../data/parashot');

const seedCollection = async (collectionName, documentName, dataset) => {
  try {
    await firestore
      .collection(collectionName)
      .doc(documentName)
      .set({
        counter: 0,
        [documentName]: dataset,
      });

    console.log('Document added successfully!');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

seedCollection('parashot', 'parashot', parashot);
