import {API} from "@/API";
import {http} from "@/http";

export const ACTION_REGISTRATION_USER = 'ACTION_REGISTRATION_USER';
export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

const MUTATION_LOGIN = 'MUTATION_LOGIN';
//const MUTATION_LOGOUT = 'MUTATION_LOGOUT';

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
        },

        async[ACTION_LOGIN] ({commit}, {username, password}) {
            const result = await API.Auth.Login(username, password);
            if (!result.err) {
                commit(MUTATION_LOGIN, result.response.user);
                const token = result.response.token;
                http.defaults.headers = {
                    Authorization: `Bearer ${token}`
                };
                localStorage.setItem('token',token);
            }
            return result.err;
        }
    },
    mutations: {
        [MUTATION_LOGIN] (state, user) {
            state.user = user;
        }

    },
    getters: {
        isAuth: state => !!state.user.username
    }
}

