import * as firebase from 'firebase';
import { errorMessageService } from '../shared/common/error-message'

const firebaseConfig = {
    apiKey: "AIzaSyAhUERkfcY7wZJ-BsgS8sjNfjCK5k861vM",
    authDomain: "mychat-2b47d.firebaseapp.com",
    databaseURL: "https://mychat-2b47d.firebaseio.com",
    projectId: "mychat-2b47d",
    storageBucket: "mychat-2b47d.appspot.com",
    messagingSenderId: "536079109042"
};

<<<<<<< HEAD
=======
//firebase.initializeApp(firebaseConfig);
>>>>>>> 07fe31787a87dbc14368743e60e7000c0ec7b1ca
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const userService = {
    signUp: (userModel) => {

        return new Promise((resolve, reject) => {

            firebase.auth().createUserWithEmailAndPassword(
                userModel.email,
                userModel.password
            ).then(credential => {
                resolve(credential)
            }).catch(error => {
<<<<<<< HEAD
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
=======
                reject(error.message)
>>>>>>> 07fe31787a87dbc14368743e60e7000c0ec7b1ca
            })

        });


    }
}
