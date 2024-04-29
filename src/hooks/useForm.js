import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    //Cuando el initialForm cambia, entonces se activa el efecto
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    //Solo va a cambiar si se llama el formValidation
    const isFormValid = useMemo(() => {

        //Revisa cada objeto dentro de formValidation
        for (const formValue of Object.keys(formValidation)) {
            //Si algun elemento de formValidation en el lugar formValue no es nulo retorna falso
            if (formValidation[formValue] !== null) return false;
        };

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues = {};

        //Recorre cada elemento de las validaciones
        for (const formField of Object.keys(formValidations)) {
            //Se obtiene la funcion y el mensaje de error 
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
        //console.log(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}