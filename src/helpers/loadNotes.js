import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../Firebase/config";

export const loadNotes = async (uid = '') => {

    if (!uid) throw new Error('el uid no existe');

    //! hay que apuntar a una coleccion no a un documento no a otra cosa a una coleccion con collection
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    //? busca un document oen la coleccion
    const docs = await getDocs(collectionRef);

    // console.log(docs);
    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });
    // console.log(notes)
    return notes;

};