import * as firebase from 'firebase';
import { errorMessageService } from '../shared/common/error-message'
import { AsyncStorage } from "react-native"

const firebaseConfig = {
    apiKey: "AIzaSyAhUERkfcY7wZJ-BsgS8sjNfjCK5k861vM",
    authDomain: "mychat-2b47d.firebaseapp.com",
    databaseURL: "https://mychat-2b47d.firebaseio.com",
    projectId: "mychat-2b47d",
    storageBucket: "mychat-2b47d.appspot.com",
    messagingSenderId: "536079109042"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const USER_STORAGE_NAME = "USER_DATA"

export const userService = {
    signUp: (userModel) => {

        return new Promise((resolve, reject) => {

            firebase.auth().createUserWithEmailAndPassword(
                userModel.email,
                userModel.password
            ).then(credential => {
                resolve(credential)
            }).catch(error => {

                var messageToShow = "Ocorreu um erro inesperado.";
                console.log(error.message)
                switch (error.message) {
                    case "The email address is badly formatted.":
                        messageToShow = errorMessageService.getErrorByName("invalid_email");
                        break;
                    case "Password should be at least 6 characters":
                        messageToShow = errorMessageService.getErrorByName("password_min_6_digits");;
                        break;

                }
                reject(messageToShow)
            })

        });


    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(credential => {
                    var userObject = {
                        email: email,
                        uid: credential.user.uid
                    }
                    userService
                        .setUser(userObject)
                        .then(() => {
                            resolve(credential)
                        });
                    resolve(credential)
                }).catch(error => {
                    reject(error);
                });
        })
    },
    sendMessage(message) {
        var newMessage = {
            message: message,
            date: new Date().toISOString()
        }

        return new Promise((resolve, reject) => {
            userService.getUser().then(user => {
                newMessage = {
                    ...newMessage,
                    uid: user ? user.uid : ''
                }
                firebase
                    .database()
                    .ref('messages')
                    .push(newMessage, (error) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(true);
                    })

            })
        })
    },

    getMessages: () => {
        return firebase
            .database()
            .ref('messages')
    },

    setUser: (userModel) => {
        return new Promise((resolve, reject) => {
            AsyncStorage
                .setItem(USER_STORAGE_NAME, JSON.stringify(userModel))
                .then(() => {
                    resolve(true);
                }, (error) => {
                    reject(error);
                })
        })
    },

    getUser: () => {
        return new Promise((resolve, reject) => {
            AsyncStorage
                .getItem(USER_STORAGE_NAME)
                .then(user => {
                    resolve(JSON.parse(user));
                }).catch(error => {
                    reject(error);
                })
        })
    },

    logout: () => {
        return new Promise((resolve,reject) => {
            AsyncStorage.clear().then(() => {
                resolve(true)
            })
        })
    }




}

