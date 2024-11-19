import { create } from 'zustand';
import { authCheckStatus, authLogin, register } from '../../../actions';
import { StorageAdapter } from '../../../config';
import { User } from '../../../domain';
import { AuthStatus } from './../../../infrastructure/interfaces/auth-status.interface';


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (username: string, password: string) => Promise<boolean>;
    register: ( name: string, username: string, password: string ) => Promise<boolean>;
    logout: () => Promise<void>;
    checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()( (set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (username: string, password: string) => {
        const resp = await authLogin(username, password);

        if(!resp) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            return false;
        }
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', user: resp.user, token: resp.token })
        return true;
    },
    logout: async() => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined })
    },
    checkStatus: async() => {
        const resp = await authCheckStatus();
        if(!resp) {
            set({status: 'unauthenticated', token: undefined, user: undefined});
            return;
        }
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user})
    },
    register: async( name: string, username: string, password: string ) => {
        
        const resp = await register( name, username, password );

        if(!resp) {
            set( { status: 'unauthenticated', token: undefined, user: undefined } );
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);
        set({status: 'authenticated', user: resp.user, token: resp.token})
        return true;
    }
    
}));


