import firebase from '@firebase/app';
import '@firebase/firestore';

export default class Templates {
    constructor() {
        this.db = firebase.firestore();
    }

    getCollection() {
        return this.db.collection("/Templates").get().then((querySnapshot) => {
            return querySnapshot.docs;
        }).catch((err) => {
            return err;
        });
    }
}
