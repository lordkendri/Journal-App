import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../Firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNote } from "../store/journal/thunks";


export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        //Funcion de Firebase que revisa cuando cambia el estado
        onAuthStateChanged(FirebaseAuth, async (user) => {
            // console.log(user);

            //?Si no hay usuario llama al logout
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;

            //Si hay un usuario llama al login
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNote());
        });
    }, []);

    return {
        status
    }
};
