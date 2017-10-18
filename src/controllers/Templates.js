import * as firebase from 'firebase';

export default class Templates {
    constructor(dbRef = 'templates/'){
        this.dbRef = dbRef;
    }

    List(){
        return firebase.database().ref(`${this.dbref}`).orderByKey().once('value').then((snapshot)=>{
            return (snapshot.val());
        })
    }

    GetRecord(type){
        return firebase.database().ref(`${this.dbRef}${type}`).orderByKey().once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    CreateRecord(newType){
        return firebase.database().ref(`${this.dbRef}`).update(newType).catch((error)=>{
            return{
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    UpdateRecord(type, input, data){
        return firebase.database().ref(`${this.dbRef}${type}/${input}`).update(data).then((created)=>{
            return data;
        }).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }
    DeleteRecord(type, input){
        return firebase.database().ref(`${this.dbRef}${type}/${input}`).remove().catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }
    DeleteTemplate(type){
        return firebase.database().ref(`${this.dbRef}${type}`).remove().catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

}
