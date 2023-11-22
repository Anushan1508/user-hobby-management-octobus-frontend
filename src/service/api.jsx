// frontend/src/services/api.jsx
import axios from 'axios';

import {notification} from "antd";

const baseURL = 'http://localhost:8082';

const api = axios.create({
    baseURL,
    withCredentials: true,
});
const notificationArgs = {
    message: "Success",
    duration: 5,
    placement: 'top'
}

export const login = async (credentials) => {
    try {
        const apiResponse = await api.post('/user/login', credentials);
        notification.success(notificationArgs);
        return apiResponse.data;
    } catch {
        notification.error(notificationArgs);
    }
}

export const getAllUsers = async () => {
    try {
        const apiResponse = await api.get('/user');
        return apiResponse.data;
    } catch {
        notification.success(notificationArgs);
    }
}

export const createUser = async (userData) => {
    try {
        const apiResponse = await api.post(`/user/add`, userData);
        notification.success(notificationArgs);
        return apiResponse.data.responseData;
    } catch {
        notification.error(notificationArgs);
    }
}

export const editUser = async (userId, userData) => {
    try {
        const apiResponse = await api.put(`/user/edit/${userId}`, userData);
        notification.success(notificationArgs);
        return apiResponse.data.responseData;
    } catch {
        notification.error(notificationArgs);
    }
}
export const userDelete = async (userId) => {
    try {
        const apiResponse = await api.delete(`/user/delete/${userId}`);
        notification.success(notificationArgs);
        return apiResponse.data.responseData;
    } catch (error) {
        console.error("Error deleting user:", error);
        notification.error(notificationArgs);
    }
}

export const createHobbies = async (userData) => {
    try {
        const apiResponse = await api.post(`hobby/add`, userData);
        notification.success(notificationArgs);
        return apiResponse.data;
    } catch {
        notification.error(notificationArgs);
    }
}

export const deleteHobbies = async (userId,) => {
    try {
        const apiResponse = await api.delete(`/hobby/delete/${userId}`);
        notification.success(notificationArgs);
        return apiResponse.data;
    } catch {
        notification.error(notificationArgs);
    }
}

export const getAllHobbiesList = async () => {
    try {
        const apiResponse = await api.get('/hobby');
        const hobbyNames = apiResponse.data.map(hobby => hobby.hobbyName);
        return hobbyNames;
    } catch (error) {
        console.error(error);
        notification.error(notificationArgs);
    }
}

export const getAllHobbies = async () => {
    try {
        const apiResponse = await api.get('/hobby');
        console.log(apiResponse);
        return apiResponse.data;
    } catch {
        notification.success(notificationArgs);
    }
}