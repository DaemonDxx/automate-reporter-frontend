import * as Report from './report'
import * as FileAPI from './file';
import * as Storage from './storage'
import * as Temperature from './temperature';
import * as Auth from './auth';

const API = {
    Report: Report,
    File: FileAPI,
    Storage: Storage,
    Temperature: Temperature,
    Auth: Auth
}

export {API}