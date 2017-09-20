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
}
