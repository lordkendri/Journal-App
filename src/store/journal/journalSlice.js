import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id:'ABC123',
        //     title: '',
        //     body:'',
        //     date: 12345,
        //     imageUrls: [] //https://foto.jpg
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            //Agrega en notes todo lo que hay en action.payload
            state.notes.push(action.payload);
            state.isSaving = false;
        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNote: (state, action) => {
            state.notes = action.payload
        },

        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote: (state, action) => { // payload: note
            state.isSaving = false;

            //Se hace porque utilizamos toolkit
            state.notes = state.notes.map(note => {

                //* Si nota.id es igual al valor del id en el valor proporcionada 
                //*entonces cambia en ese lugar el valor de action.payload
                if (note.id === action.payload.id) {
                    return action.payload;
                };

                return note;
            });

            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        clearNoteLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;

            //concatenacion de spread -Preserva las atentriores y les agrega las nuevas
            state.active.imageUrl = [...state.active.imageUrl, ...action.payload];
        },

    }
});

export const {
    addNewEmptyNote,
    clearNoteLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNote,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;