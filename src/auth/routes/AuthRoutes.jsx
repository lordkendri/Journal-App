import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* En caso de que el path no coincida con los dos anteriores que retorne a login */}
            <Route path="/*" element={<Navigate to={'/auth/login'} />} />
        </Routes>
    )
}
