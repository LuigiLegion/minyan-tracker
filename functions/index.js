const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('Notification added: ', doc));
};

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();

      const newNotification = {
        content: ' joined congregation ',
        user: newUser.fullName,
        congregation: newUser.congregation,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(newNotification);
    });
});
