import * as Report from './report'
import * as FileAPI from './file';
import * as Storage from './storage_api'
import * as Auth from './auth_api';
import * as Value from  './value_api';
import * as Solver from './solver_api';

const API = {
    Report: Report,
    File: FileAPI,
    Storage: Storage,
    Auth: Auth,
    Value: Value,
    Solver: Solver
}

export {API}