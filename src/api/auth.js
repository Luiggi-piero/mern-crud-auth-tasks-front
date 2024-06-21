import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

// para autenticar cada vez que se recarga la web, es decir cuando se monta por primera vez
export const verifyTokenRequest = () => axios.get('/verify')