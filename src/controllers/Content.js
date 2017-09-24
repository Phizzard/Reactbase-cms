import * as firebase from 'firebase';

export default class Content {
    constructor(dbRef = 'content/'){
        this.dbRef = dbRef;
    }

    List(){
        return firebase.database().ref(`${this.dbRef}`).once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    GetRecord(type, item=""){
        return firebase.database().ref(`${this.dbRef}${type}/${item}`).once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    updateRecord(type, input, data){
        return firebase.database().ref(`${this.dbRef}${type}/${input}`).update(data).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    updateCollection(type, inputs){
        for (let input in inputs) {
            return this.updateRecord(type, input, inputs[input]).catch((error)=>{
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                };
            });
        }
    }
}
