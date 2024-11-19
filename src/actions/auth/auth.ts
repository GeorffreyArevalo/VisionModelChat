import { chatApi } from "../../config";
import { User } from "../../domain";
import { AuthResponse } from "../../infrastructure";


const returnUserAuthToken = ( data: AuthResponse ) => {

    const user: User = {
        id: data.id,
        name: data.name,
        username: data.username,
    }
    return {
        token: data.token,
        user: user,
    }

}

export const authLogin = async( username: string, password: string ) => {

    username = username.toLowerCase();

    try {
        const {data} = await chatApi.post<AuthResponse>('/auth/login', {
            username, password,
        });
        return returnUserAuthToken( data );
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export const register = async( name: string, username: string, password: string ) => {

    username = username.toLowerCase();

    try {
        
        const { data } = await chatApi.post<AuthResponse>('/auth/create', {
            name, username, password
        });

        return returnUserAuthToken( data );

    } catch (error) {
        console.log(error);
        return null;
    }

}

export const authCheckStatus = async() => {
    try {
        
        const {data} = await chatApi.get<AuthResponse>('/auth/renew');
        return returnUserAuthToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}

