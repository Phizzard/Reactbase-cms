import * as firebase from 'firebase';

export default class Configuration {
    constructor(dbRef = 'configuration/'){
        this.dbRef = dbRef;
    }
    InitializeDataBase(config){
        firebase.initializeApp(config);
        return firebase.database()
            .ref('/')
                .update({content: true, templates: true})
                    .then((result)=>{
                        return (result);
                    }).catch((error)=>{
                        return{
                            errorCode: error.code,
                            errorMessage: error.message
                        };
                    });
    }
    List(){
        return firebase.database().ref(`${this.dbRef}`).orderByKey().once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }
    GetRecord(type){
        return firebase.database().ref(`${this.dbRef}${type}`).orderByKey().once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    CreateRecord(type, newRecord){
        return firebase.database().ref(`${this.dbRef}/${type}`).update(newRecord).catch((error)=>{
            return{
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    UpdateRecord(type, data){
        return firebase.database().ref(`${this.dbRef}${type}`).update(data).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    DeleteRecord(type){
        return firebase.database().ref(`${this.dbRef}${type}`).remove().catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }
}
