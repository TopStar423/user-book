import axios from 'axios';
import { setSession, setToken } from '../helper/auth.service';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const login = async (email, password) => {
    try {
        const loginApi = BACKEND_URL + '/login';
        const { data } = await axios.post(loginApi, {
            email,
            password
        });
        const { user, token } = data;

        setToken(token);
        setSession(user);

        return user;
    } catch (err) {
        throw(err);
    }
}

export const register = async newUser => {
    try {
        const registerApi = BACKEND_URL + '/register';
        const { data } = await axios.post(registerApi, {
            user: newUser
        });
        const { user, token } = data;

        setToken(token);
        setSession(user);

        return user;
    } catch (err) {
        throw(err);
    }
}