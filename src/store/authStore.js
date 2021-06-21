import {API} from "@/API";
import {http} from "@/http";
import * as hash from 'object-hash';
import { VueApp } from '../main';

export const ACTION_REGISTRATION_USER = 'ACTION_REGISTRATION_USER';
export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';
export const ACTION_UPDATE_USER_INFO = 'ACTION_UPDATE_USER_INFO';
export const ACTION_GET_USER_INFO = 'ACTION_GET_USER_INFO';

const MUTATION_UPDATE_USER = 'MUTATION_LOGIN';
const MUTATION_LOGOUT = 'MUTATION_LOGOUT';

function getHashPassword(password) {
    return hash.MD5(password);
}

const transformUsername = (username) => {
    return username
        .toLowerCase()
        .trim()
}

export const AuthStore = {
    state: {
        user: {}
    },
    actions: {
        async [ACTION_REGISTRATION_USER] (ctx, {username, password, key}) {
            try {
                const user = await API.Auth.Registration(
                    transformUsername(username),
                    getHashPassword(password),
                    key,
                );
                this._vm.$notify({
                    text: 'Регистрация прошла успешно',
                    type: 'success'
                })
                return user;
            } catch(e) {
                VueApp.handleError(e);
                return null;
            }
        },

        async [ACTION_GET_USER_INFO] (ctx, _id = '') {
            try {
                const user = await API.Auth.UserInfo(_id);
                return user;
            } catch (e) {
                VueApp.handleError(e);
                return null;
            }

        },

        async [ACTION_UPDATE_USER_INFO] ({commit, dispatch}) {
            try {
                const user = await dispatch(ACTION_GET_USER_INFO);
                commit(MUTATION_UPDATE_USER, user);
                return user;
            } catch (e) {
                VueApp.handleError(e);
                dispatch(ACTION_LOGOUT);
                return null;
            }

        },

        async[ACTION_LOGIN] ({dispatch}, {username, password}) {
            try {
                const token = await API.Auth.Login(transformUsername(username), getHashPassword(password));
                http.defaults.headers['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('token', token);
                await dispatch(ACTION_UPDATE_USER_INFO);
                return true;
            } catch (e) {
                VueApp.handleError(e);
                return false;
            }

        },

        [ACTION_LOGOUT] ({commit}) {
            http.defaults.headers['Authorization'] = '';
            localStorage.removeItem('token');
            commit(MUTATION_LOGOUT);
        }
    },
    mutations: {
        [MUTATION_UPDATE_USER] (state, user) {
            state.user = user;
        },

        [MUTATION_LOGOUT] (state) {
            state.user = {};
        }

    },
    getters: {
        isAuth: state => !!state.user?.username,
        myRole: state => state.user.role
    }
}

