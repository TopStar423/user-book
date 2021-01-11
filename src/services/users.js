import axios from 'axios';
import { apiOption } from '../constants/api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getUsers = async () => {
    try {
        const getUsersApi = BACKEND_URL + '/users';
        const res = await axios.get(getUsersApi, apiOption);
        const users = res.data;

        return users;
    } catch (err) {
        throw(err);
    }
}

export const createUser = async user => {
    try {
        const createUserApi = BACKEND_URL + '/user';
        const res = await axios.post(createUserApi, { user }, apiOption);
        const newUser = res.data;

        return newUser;
    } catch (err) {
        throw(err);
    }
}

export const updateUser = async user => {
    try {
        const updateUserApi = BACKEND_URL + '/user';
        const res = await axios.put(updateUserApi, { user }, apiOption);
        const updatedUser = res.data;

        return updatedUser;
    } catch (err) {
        throw(err);
    }
}

export const deleteUser = async user => {
    try {
        const deleteUserApi = BACKEND_URL + `/user/${user._id}`;
        const res = await axios.delete(deleteUserApi, apiOption);
        const deletedUser = res.data;

        return deletedUser;
    } catch (err) {
        throw(err);
    }
}