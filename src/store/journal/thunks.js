import { FirebaseDB } from "../../Firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNote, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {


    return async (dispatch, getState) => { //El getState es una funcion hacer clg
        // console.log(getState());

        dispatch(savingNewNote());

        //uid

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            imageUrl: [],
            date: new Date().getTime()
        };

        //Se crean valores en CloudFireStore
        //! se crea una especie de path qu define como se crearan las colecciones y los valores guardados
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        // console.log({newDoc, setDocResp});

        //Se le crea la propiedad id a newNote
        newNote.id = newDoc.id;


        //!dispatch

        dispatch(addNewEmptyNote(newNote)); //El payload es newNote
        dispatch(setActiveNote(newNote)); //El payload es newNote



    };
};

export const startLoadingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!uid) throw new Error('El uid del usuario no esta establecido');
        // console.log({uid})

        const notes = await loadNotes(uid);
        // console.log(notes)
        dispatch(setNote(notes));
    };
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        //! utilizando el spread eliminarla propiedad id de la nota a 
        //! mandar para evitar inconvenientes ya que dentro de la nota no esta el ID
        //! Sino en el Doc
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        //Referencia
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        //* Cambia el documento con la referencia docRef, por el contenido de noteToFireStore
        //* Y se le agrega la propuedad merge, osea que si hay campos nuevos los campos de la
        //*  base de datos se mantiene
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNote(note))
    };
};

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(setSaving());

        // console.log(files);

        // await fileUpload(files[0]);

        //? Subir de forma simultania los archivos
        const fileUploadPromises = [];

        //!Se almacena los archivos en el arreglo fileUploadPromises
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        };

        //Se establece el arreglo de img
        const photosURLs = await Promise.all(fileUploadPromises);
        // console.log(photosURLs);
        dispatch(setPhotosToActiveNote(photosURLs));
    };
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        // console.log(uid, note);

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    };
};