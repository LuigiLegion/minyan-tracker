const firebase = require('../config/fbConfig');
require('firebase/firestore');
const firestore = firebase.firestore();

const { services } = require('../data/services');

const seedCollection = async (collectionName, dataset) => {
  try {
    const usersIdsArr = [];

    const usersRef = firestore.collection('users');
    await usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          console.log(user.id, '=>', user.data());

          usersIdsArr.push(user.id);
        });
      })
      .catch(error => {
        console.log('Error getting documents', error);
      });

    console.log({ usersIdsArr });

    const usersUpdatesUnresolvedPromises = usersIdsArr.reduce(
      (acc, curUserId) => {
        acc.push(
          firestore
            .collection(collectionName)
            .doc(curUserId)
            .set(dataset, { merge: true })
        );

        return acc;
      },
      []
    );

    console.log({ usersUpdatesUnresolvedPromises });

    Promise.all(usersUpdatesUnresolvedPromises);
  } catch (error) {
    console.error('Error updating documents: ', error);
  }
};

seedCollection('users', services);
