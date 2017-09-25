import * as firebase from 'firebase';

export default class Content {
    constructor(dbRef = 'content/'){
        this.dbRef = dbRef;
    }

    List(){
        return firebase.database().ref(`${this.dbRef}`).orderByKey().once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    GetRecord(type, item=""){
        return firebase.database().ref(`${this.dbRef}${type}/${item && 'items/'+item}`).orderByKey().once('value').then((snapshot)=>{
            let data = snapshot.val();
            return(data);
        });
    }

    CreateType(newType){
        return firebase.database().ref(`${this.dbRef}`).update(newType).catch((error)=>{
            return{
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    UpdateRecord(type, input, data, itemId=""){
        return firebase.database().ref(`${this.dbRef}${type}/${itemId && 'items/'+itemId+'/'}${input}`).update(data).catch((error)=>{
            return {
                errorCode: error.code,
                errorMessage: error.message
            };
        });
    }

    UpdateCollection(type, inputs, itemId=""){
        for (let input in inputs) {
            return this.UpdateRecord(type, input, inputs[input], itemId).catch((error)=>{
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                };
            });
        }
    }
}
