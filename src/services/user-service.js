import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAhUERkfcY7wZJ-BsgS8sjNfjCK5k861vM",
    authDomain: "mychat-2b47d.firebaseapp.com",
    databaseURL: "https://mychat-2b47d.firebaseio.com",
    projectId: "mychat-2b47d",
    storageBucket: "mychat-2b47d.appspot.com",
    messagingSenderId: "536079109042"
};

firebase.initializeApp(firebaseConfig);

export const userService = {
    signUp: (userModel) => {

        return new Promise((resolve, reject) => {

            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
                userModel.email,
                userModel.password
            ).then(credential => {
                resolve(credential)
            }).then(error => {
                reject(error.message)
            })

        });


    }
}