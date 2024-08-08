import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000/api', // la url base que usara en cada peticion
    baseURL: 'https://mern-crud-auth-tasks.onrender.com/api',
    withCredentials: true   // para que establezca las cookies
})

export default instance;

/**
 * withCredentials en true permite que las solicitudes incluyan credenciales como 
 * cookies, encabezados de autenticación, o certificados TLS del lado del cliente. 
 * Esto es útil cuando necesitas autenticar al usuario en cada solicitud.
 */