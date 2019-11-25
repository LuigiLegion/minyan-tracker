const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('Notification Added: ', doc));
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
        content: ' joined the community',
        user: newUser.fullName,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };
      return createNotification(newNotification);
    });
});
