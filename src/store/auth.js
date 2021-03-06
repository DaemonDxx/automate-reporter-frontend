import {API} from "@/API";
import {http} from "@/http";

export const ACTION_REGISTRATION_USER = 'ACTION_REGISTRATION_USER';
export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';

const MUTATION_LOGIN = 'MUTATION_LOGIN';
const MUTATION_LOGOUT = 'MUTATION_LOGOUT';

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
                commit(MUTATION_LOGIN, {
                        user: result.response.user,
                        token: result.response.token,
                    }
                );
            }
            return result.err;
        },

        [ACTION_LOGOUT] ({commit}) {
            commit(MUTATION_LOGOUT);
        }
    },
    mutations: {
        [MUTATION_LOGIN] (state, {user, token}) {
            state.user = user;
            http.defaults.headers['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token',token);
        },

        [MUTATION_LOGOUT] (state) {
            state.user = {};
            http.defaults.headers['Authorization'] = '';
            localStorage.removeItem('token');
        }

    },
    getters: {
        isAuth: state => !!state.user.username
    }
}

