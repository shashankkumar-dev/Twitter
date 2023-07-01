import { navigate } from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tweet from "../model/Tweet";



const attachTokenToHeaders = async () => {
    const headers: HeadersInit = {};

    const token = await getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

const handleResponse = async (response: Response) => {
    if (response.ok) {
        return response.json();
    } else if (response.status === 401) {
        navigate('Login');
        throw new Error('Unauthorized');
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
};

export const get = async <T>(url: string): Promise<T> => {
    const headers = await attachTokenToHeaders();
    const response = await fetch(url, { headers });
    return handleResponse(response);
};

export const post = async (url: string, data: Tweet): Promise<any> => {
    const tokenHeader = await  attachTokenToHeaders()
    const headers = {
        ...tokenHeader,
        'Content-Type': 'application/json',
    };
    console.log(headers)
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    console.log(response);
    return handleResponse(response);
};


export const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('Token stored:', token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token retrieved:', token);
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};
