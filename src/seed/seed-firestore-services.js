// Imports
const firebase = require('../config/fbConfig');
require('firebase/firestore');
const firestore = firebase.firestore();

const { services } = require('../data/services');

// Initializations
const seedCollection = async (collectionName, dataset) => {
  try {
    const userIds = [];

    const usersRef = firestore.collection('users');
    await usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          console.log(user.id, '=>', user.data());

          userIds.push(user.id);
        });
      })
      .catch(error => {
        console.error('Error fetching documents: ', error);
      });

    console.log({ userIds });

    const userUpdates = userIds.reduce((acc, userId) => {
      acc.push(
        firestore
          .collection(collectionName)
          .doc(userId)
          .set(dataset, { merge: true })
      );

      return acc;
    }, []);

    console.log({ userUpdates });

    Promise.all(userUpdates);
  } catch (error) {
    console.error('Error updating documents: ', error);
  }
};

seedCollection('users', services);
