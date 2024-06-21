import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {

    const { loading, isAuthenticated } = useAuth()

    // console.log(loading, isAuthenticated);

    if(loading) return <h1>Loading...</h1>

    // <Navigate 
    // to='/login'   -> navega a login
    // replace   -> no vuelve a la ruta anterior se sobreescribe
    // />
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return (
        // continua con la ruta que tipicamente tendría que visitar según el archivo App.jsx
        // continua con el componente que esta dentro
        <Outlet />
    )
}

export default ProtectedRoute