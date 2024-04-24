import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        const { displayName, email, photoURL, uid } = result.user;
        // console.log({user})

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid,
        }

        //? Obtener credenciales o info relacionada
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials});
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    console.log({ email, password, displayName })

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        //Todo: Actualizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, {
            //Se actualiza el usuario en displayName
            displayName
        });


        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error)
        //Esto lee el codigo de error que se manda desde Firebase
        return { ok: false, errorMessage: error.message }
    };

};

export const loginWithEmailPassword = async ({ email, password }) => {
    //? Llamar sighInWithEmailAndPassword de Firebase

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        console.log(resp);
        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        //Esto lee el codigo de error que se manda desde Firebase
        return { ok: false, errorMessage: error.message }
    }

};

export const logoutFirebase = async () => {
    // Cierra todo lo que tenga que ver con FireBase
    return await FirebaseAuth.signOut();
};