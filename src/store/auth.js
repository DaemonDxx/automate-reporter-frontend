import {API} from "@/API";

export const ACTION_REGISTRATION_USER = 'ACTION_REGISTRATION_USER';
export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

// const MUTATION_LOGIN = 'MUTATION_LOGIN';
// const MUTATION_LOGOUT = 'MUTATION_LOGOUT';

export const Auth = {
    state: {
        user: {}
    },
    actions: {
        async [ACTION_REGISTRATION_USER] (ctx, {username, password, key}) {
            const result = await API.Auth.Registration(
                username,
                password,
                key,
            );
            return result.err;
        }
    },
    mutations: {},
    getters: {
        isAuth: state => !!state.user.username
    }
}

