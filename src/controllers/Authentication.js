import * as firebase from 'firebase';

export default class Authentication {

    LogIn(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        })
        ;
    }

    SignUp(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        })
        ;
    }

    LogOut(){
        firebase.auth().signOut();
    }
}
