import { Route, Routes, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

    //CustomHook
    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {/* Proteccion de rutas */}
            {
                (status === 'authenticated')
                    ? < Route path="/*" element={<JournalRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            };

            {/* Si entra en una ruta inexistente */}
            <Route path="/*" element={<Navigate to="/auth/*" />} />


            {/* Login y Registro */}
            {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

            {/* JournalApp */}
            {/* <Route path="/*" element={<JournalRoutes />} /> */}
        </Routes>
    )
}
