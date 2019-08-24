import firebase from 'firebase/app';
import 'firebase/database';


var firebaseConfig = {
  apiKey: 'AIzaSyCMrmjFwi7QaHaniKPlk_7sh45DRO05p9U',
  authDomain: 'messengerapp-4e820.firebaseapp.com',
  databaseURL: 'https://messengerapp-4e820.firebaseio.com',
  projectId: 'messengerapp-4e820',
  storageBucket: '',
  messagingSenderId: '174986671626',
  appId: '1:174986671626:web:3a5d48bacdc7d03c',
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export const getChats = () => {
  return new Promise((resolve, reject) => {
    database.ref('/').on('value', snapshot => {
      let chatData = snapshot.val();
      resolve(chatData);
    });
  }).catch(err => {
    console.error(err);
    alert('Failed to fetch chat data!');
  });
};

export const sendMessage_FirebaseAPI = (message, messageTo, messageId) => {
  firebase
    .database()
    .ref(`messages/${messageTo}`)
    .update({
      [messageId]: {
        is_user_msg: true,
        time: new Date().toISOString(),
        text: message,
      },
    });
}
